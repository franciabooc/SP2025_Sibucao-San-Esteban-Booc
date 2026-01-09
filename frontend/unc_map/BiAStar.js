import { CampusCellType } from './celltype.js';
import graphData from './nodes_connection.json';
import { nameToNodeMap } from './mapSvg.js';
import nodesDataDefault from './nodes.json';

export class BiAStar {
    constructor(nodesDataParam) {
        // Initializing nodes and connections from JSON files
        const source = nodesDataParam && nodesDataParam.nodes ? nodesDataParam : nodesDataDefault;
        this.nodes = source.nodes || {};
        this.masterConnections = (graphData && graphData.connections) ? graphData.connections : {};
        // currentConnections lets us modify weights (penalties) without ruining the original data
        this.currentConnections = JSON.parse(JSON.stringify(this.masterConnections));
    }

    heuristic(u, v) {
        // Estimates distance between two nodes using the Pythagorean theorem (straight-line distance)
        const uNode = this.nodes[u];
        const vNode = this.nodes[v];
        if (!uNode || !vNode) {
            console.warn(`BiAStar.heuristic: missing node u=${u}(${!!uNode}), v=${v}(${!!vNode})`);
            return 0;
        }
        return Math.hypot(uNode.x - vNode.x, uNode.y - vNode.y);
    }

    getEntrancesForBuilding(buildingNameOrId) {
        // Converts a building name (like "Library") into its node IDs (like ["18"])
        const entry = nameToNodeMap[buildingNameOrId];
        if (entry) return Array.isArray(entry) ? entry : [String(entry)];
        return [String(buildingNameOrId)];
    }

    findTwoPaths(startInput, endInput) {
        // Handles the logic for generating both the primary and alternative routes
        const startEntrances = this.getEntrancesForBuilding(startInput);
        const endEntrances = this.getEntrancesForBuilding(endInput);

        let bestPrimaryPath = [];
        let bestPrimaryCost = Infinity;
        let bestStartNode = null;
        let bestEndNode = null;

        // Nested loop to find the shortest path among all possible entrance/exit combinations
        for (let sId of startEntrances) {
            if (!this.nodes[String(sId)]) continue;
            for (let tId of endEntrances) {
                if (!this.nodes[String(tId)]) continue;
                if (String(sId) === String(tId)) continue;

                this.currentConnections = JSON.parse(JSON.stringify(this.masterConnections));

                const pathNodes = this.query(sId, tId);
                if (pathNodes.length > 0) {
                    const pathCost = this.calculatePathCost(pathNodes);
                    if (pathCost < bestPrimaryCost) {
                        bestPrimaryCost = pathCost;
                        bestPrimaryPath = pathNodes;
                        bestStartNode = sId;
                        bestEndNode = tId;
                    }
                }
            }
        }

        if (bestPrimaryPath.length === 0) {
            return { primary: [], alternative: [], weight: Infinity };
        }

        // Logic for Alternative Path: Penalize the primary route so the algorithm picks a different way
        this.currentConnections = JSON.parse(JSON.stringify(this.masterConnections));
        this.penalizePath(bestPrimaryPath);
        const alternativePathNodes = this.query(bestStartNode, bestEndNode);

        return {
            primary: this.nodesToCoords(bestPrimaryPath),
            alternative: this.nodesToCoords(alternativePathNodes),
            weight: bestPrimaryCost
        };
    }

    calculatePathCost(pathIds) {
        // Totals the weight of all edges in a finished path
        if (!pathIds || pathIds.length < 2) return 0;
        let cost = 0;
        for (let i = 0; i < pathIds.length - 1; i++) {
            const u = String(pathIds[i]);
            const v = String(pathIds[i + 1]);
            if (this.currentConnections[u] && this.currentConnections[u][v] != null) {
                cost += this.currentConnections[u][v];
            } else {
                cost += 1e6; // Large penalty for broken/missing paths
            }
        }
        return cost;
    }

    penalizePath(pathIds) {
        // Adds weight to the primary path nodes to force the query to find a different alternative
        if (!pathIds || pathIds.length < 2) return;
        for (let i = 0; i < pathIds.length - 1; i++) {
            const u = String(pathIds[i]);
            const v = String(pathIds[i + 1]);
            if (this.currentConnections[u] && this.currentConnections[u][v] != null) {
                this.currentConnections[u][v] += 500;
            }
            if (this.currentConnections[v] && this.currentConnections[v][u] != null) {
                this.currentConnections[v][u] += 500;
            }
        }
    }

    query(s, t) {
        // The Bidirectional A* search engine: starts from BOTH ends and meets in the middle
        if (!s || !t) return [];
        s = String(s);
        t = String(t);
        if (s === t) return [s];

        let forwardDist = { [s]: 0 };
        let backwardDist = { [t]: 0 };
        let forwardParent = { [s]: null };
        let backwardParent = { [t]: null };

        let qForward = [[0, s]];
        let qBackward = [[0, t]];

        let visitedForward = new Set();
        let visitedBackward = new Set();
        let meetingNode = null;

        // Alternating search from start and end to optimize speed
        while (qForward.length > 0 && qBackward.length > 0) {
            // Forward step
            qForward.sort((a, b) => a[0] - b[0]);
            let [_, u] = qForward.shift();
            if (visitedForward.has(u)) continue;
            visitedForward.add(u);
            if (visitedBackward.has(u)) { meetingNode = u; break; } // Check if paths met
            this.expand(u, forwardDist, qForward, forwardParent, t);

            // Backward step
            qBackward.sort((a, b) => a[0] - b[0]);
            let [__, v] = qBackward.shift();
            if (visitedBackward.has(v)) continue;
            visitedBackward.add(v);
            if (visitedForward.has(v)) { meetingNode = v; break; } // Check if paths met
            this.expand(v, backwardDist, qBackward, backwardParent, s);
        }

        return this.reconstructPathNodes(forwardParent, backwardParent, meetingNode);
    }

    expand(u, dists, queue, parents, targetId) {
        // Core expansion logic: checks neighbors and calculates their priorities (g + h)
        const uKey = String(u);
        const neighbors = this.currentConnections[uKey] || {};
        const Types = CampusCellType || { OBSTACLE: 1, RESTRICTED: 9, CONSTRUCTION: 10, STAIRS: 6 };

        for (let v in neighbors) {
            const nodeInfo = this.nodes[v];
            if (!nodeInfo) continue;

            // Safety check: Skip impassable areas
            if ([Types.OBSTACLE, Types.RESTRICTED, Types.CONSTRUCTION].includes(nodeInfo.type)) {
                continue;
            }

            let weight = neighbors[v];
            // Penalty logic: make stairs slightly less desirable than flat ground
            if (nodeInfo.type === Types.STAIRS) weight += 2;

            let newDist = dists[u] + weight;
            if (dists[v] === undefined || newDist < dists[v]) {
                dists[v] = newDist;
                // A* Priority: Current distance + half of the heuristic estimate
                let priority = newDist + (this.heuristic(v, targetId) * 0.5);
                queue.push([priority, v]);
                parents[v] = u;
            }
        }
    }

    reconstructPathNodes(fParent, bParent, meetingNode) {
        // Stitches the forward and backward search results together into one full path
        if (!meetingNode) return [];
        let path = [];
        let curr = meetingNode;
        while (curr !== null) {
            path.unshift(curr); // Backtrack forward parents
            curr = fParent[curr];
        }
        curr = bParent[meetingNode];
        while (curr !== null) {
            if (curr !== meetingNode) path.push(curr); // Backtrack backward parents
            curr = bParent[curr];
        }
        return path;
    }

    nodesToCoords(pathIds) {
        // Converts the final list of node IDs into {x, y} coordinates for the Map to draw
        if (!pathIds || pathIds.length === 0) return [];
        const out = [];
        for (let id of pathIds) {
            const key = String(id);
            if (!this.nodes[key]) continue;
            out.push({ x: this.nodes[key].x, y: this.nodes[key].y });
        }
        return out;
    }
}