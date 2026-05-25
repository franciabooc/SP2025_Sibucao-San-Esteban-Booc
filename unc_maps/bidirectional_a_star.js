// bidirectional_a_star.js
import { CampusCellType } from './celltype.js';

export class BiAStar {
    // Dynamically accept the entire specific building graph object (nodes + connections combined)
    constructor(buildingGraph) {
        if (!buildingGraph || !buildingGraph.nodes || !buildingGraph.connections) {
            throw new Error("BiAStar Error: Missing or invalid building routing data passed to constructor.");
        }
        this.nodes = buildingGraph.nodes;
        this.masterConnections = buildingGraph.connections;
        
        // Setup initial mutable copy for calculation state modifications
        this.currentConnections = JSON.parse(JSON.stringify(this.masterConnections));
    }

    // Identifies the floor cleanly based on your explicit naming signatures or structural metadata properties
    getNodeFloor(nodeId) {
        const node = this.nodes[nodeId];
        if (node && node.floor !== undefined) return node.floor;

        // Pattern matching signature backup
        if (nodeId.includes('_f1_')) return 1;
        if (nodeId.includes('_f2_')) return 2;
        if (nodeId.includes('_f3_')) return 3;
        return 1; // Default floor fallback
    }

    // Heuristic: 3D Euclidean distance calculation (Prevents 2D floor arrival loops)
    heuristic(u, v) {
        const uNode = this.nodes[u];
        const vNode = this.nodes[v];
        if (!uNode || !vNode) return 0;

        const floorU = this.getNodeFloor(u);
        const floorV = this.getNodeFloor(v);

        // Simulated vertical elevation distance value (300 canvas pixels map scale per floor level)
        const FLOOR_HEIGHT_SCALE = 300; 
        const dz = (floorU - floorV) * FLOOR_HEIGHT_SCALE;

        return Math.sqrt(
            Math.pow(uNode.x - vNode.x, 2) +
            Math.pow(uNode.y - vNode.y, 2) +
            Math.pow(dz, 2) // Injects the missing Z-axis!
        );
    }

    // Maps building inputs to nodes self-contained without needing mapSvg.js
    getEntrancesForBuilding(buildingNameOrId) {
        if (!buildingNameOrId) return [];
        const cleanInput = String(buildingNameOrId).trim().toLowerCase();

        // 1. If the input is already a direct node ID key, just wrap it and return it
        if (this.nodes[buildingNameOrId]) return [String(buildingNameOrId)];
        if (this.nodes[cleanInput]) return [cleanInput];

        // 2. Otherwise, look through nodes to see if any node names match this text description
        const matchedNodeIds = [];
        for (let id in this.nodes) {
            const node = this.nodes[id];
            if (node.name && node.name.toLowerCase() === cleanInput) {
                matchedNodeIds.push(id);
            }
        }

        // 3. Fallback: If no matches found, return the raw string as an ID choice
        return matchedNodeIds.length > 0 ? matchedNodeIds : [String(buildingNameOrId)];
    }

    // --- MAIN METHOD TO GET BOTH PATHS ---
    findTwoPaths(startInput, endInput) {
        const startEntrances = this.getEntrancesForBuilding(startInput);
        const endEntrances = this.getEntrancesForBuilding(endInput);

        let bestPrimaryPath = [];
        let bestPrimaryCost = Infinity;
        let bestStartNode = null;
        let bestEndNode = null;

        // Evaluate all door layout entrance combinations
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

        // Alternative Path Generation: Penalize primary route nodes
        this.currentConnections = JSON.parse(JSON.stringify(this.masterConnections));
        this.penalizePath(bestPrimaryPath);
        const alternativePathNodes = this.query(bestStartNode, bestEndNode);

        return {
            primary: this.nodesToFullObjects(bestPrimaryPath),
            alternative: this.nodesToFullObjects(alternativePathNodes),
            weight: bestPrimaryCost
        };
    }

    calculatePathCost(pathIds) {
        if (!pathIds || pathIds.length < 2) return 0;
        let cost = 0;
        for (let i = 0; i < pathIds.length - 1; i++) {
            const u = String(pathIds[i]);
            const v = String(pathIds[i + 1]);
            if (this.currentConnections[u] && this.currentConnections[u][v] != null) {
                cost += this.currentConnections[u][v];
            } else {
                cost += 1e6;
            }
        }
        return cost;
    }

    penalizePath(pathIds) {
        if (!pathIds || pathIds.length < 2) return;

        let startIndex = (pathIds.length > 4) ? 1 : 0;
        let endIndex = (pathIds.length > 4) ? pathIds.length - 2 : pathIds.length - 1;

        for (let i = startIndex; i < endIndex; i++) {
            const u = String(pathIds[i]);
            const v = String(pathIds[i + 1]);

            if (this.currentConnections[u] && this.currentConnections[u][v] != null) {
                this.currentConnections[u][v] *= 2.0;
            }
            if (this.currentConnections[v] && this.currentConnections[v][u] != null) {
                this.currentConnections[v][u] *= 2.0;
            }
        }
    }

    query(s, t) {
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

        while (qForward.length > 0 && qBackward.length > 0) {
            // Forward step
            qForward.sort((a, b) => a[0] - b[0]);
            let [_, u] = qForward.shift();
            if (visitedForward.has(u)) continue;
            visitedForward.add(u);
            if (visitedBackward.has(u)) { meetingNode = u; break; }
            this.expand(u, forwardDist, qForward, forwardParent, t);

            // Backward step
            qBackward.sort((a, b) => a[0] - b[0]);
            let [__, v] = qBackward.shift();
            if (visitedBackward.has(v)) continue;
            visitedBackward.add(v);
            if (visitedForward.has(v)) { meetingNode = v; break; }
            this.expand(v, backwardDist, qBackward, backwardParent, s);
        }

        return this.reconstructPathNodes(forwardParent, backwardParent, meetingNode);
    }

    expand(u, dists, queue, parents, targetId) {
        const uKey = String(u);
        const neighbors = this.currentConnections[uKey] || {};
        const Types = CampusCellType || { OBSTACLE: 1, RESTRICTED: 9, CONSTRUCTION: 10, STAIRS: 6 };

        for (let v in neighbors) {
            const nodeInfo = this.nodes[v];
            if (!nodeInfo) continue;

            if ([Types.OBSTACLE, Types.RESTRICTED, Types.CONSTRUCTION].includes(nodeInfo.type)) {
                continue;
            }

            let weight = neighbors[v];
            
            // FLOOR LINK STAIR ENHANCEMENT
            if (nodeInfo.type === Types.STAIRS) {
                const uFloor = this.getNodeFloor(u);
                const vFloor = this.getNodeFloor(v);

                if (uFloor !== vFloor) {
                    weight += 40; // Penalty cost for vertical movement up or down
                } else {
                    weight += 2;  // standard baseline stairs platform tracking cost
                }
            }

            let newDist = dists[u] + weight;
            if (dists[v] === undefined || newDist < dists[v]) {
                dists[v] = newDist;
                let priority = newDist + (this.heuristic(v, targetId) * 0.5);
                queue.push([priority, v]);
                parents[v] = u;
            }
        }
    }

    reconstructPathNodes(fParent, bParent, meetingNode) {
        if (!meetingNode) return [];
        let path = [];
        let curr = meetingNode;
        while (curr !== null) {
            path.unshift(curr);
            curr = fParent[curr];
        }
        curr = bParent[meetingNode];
        while (curr !== null) {
            if (curr !== meetingNode) path.push(curr);
            curr = bParent[curr];
        }
        return path;
    }

    // Generates full node objects containing x, y, id, and floor context (Better map tracking)
    nodesToFullObjects(pathIds) {
        if (!pathIds || pathIds.length === 0) return [];
        return pathIds.map(id => {
            const key = String(id);
            const node = this.nodes[key];
            const calculatedFloor = this.getNodeFloor(key);
            return node 
                ? { ...node, id: key, floor: node.floor || calculatedFloor }
                : { id: key, x: 0, y: 0, floor: calculatedFloor };
        });
    }
}