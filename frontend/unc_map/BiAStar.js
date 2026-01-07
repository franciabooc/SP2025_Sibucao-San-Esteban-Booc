import { CampusCellType } from './celltype.js';
import graphData from './nodes_connection.json';
import { nameToNodeMap } from './mapSvg.js';
import nodesDataDefault from './nodes.json';

export class BiAStar {
    constructor(nodesDataParam) {
        // allow passing nodesData or fall back to local file
        const source = nodesDataParam && nodesDataParam.nodes ? nodesDataParam : nodesDataDefault;
        this.nodes = source.nodes || {};
        this.masterConnections = (graphData && graphData.connections) ? graphData.connections : {};
        this.currentConnections = JSON.parse(JSON.stringify(this.masterConnections));
    }

    heuristic(u, v) {
        const uNode = this.nodes[u];
        const vNode = this.nodes[v];
        if (!uNode || !vNode) {
            // missing node(s) -> return 0 so heuristic doesn't break the search
            console.warn(`BiAStar.heuristic: missing node u=${u}(${!!uNode}), v=${v}(${!!vNode})`);
            return 0;
        }
        return Math.hypot(uNode.x - vNode.x, uNode.y - vNode.y);
    }

    getEntrancesForBuilding(buildingNameOrId) {
        const entry = nameToNodeMap[buildingNameOrId];
        if (entry) return Array.isArray(entry) ? entry : [String(entry)];
        return [String(buildingNameOrId)];
    }

    findTwoPaths(startInput, endInput) {
        const startEntrances = this.getEntrancesForBuilding(startInput);
        const endEntrances = this.getEntrancesForBuilding(endInput);

        let bestPrimaryPath = [];
        let bestPrimaryCost = Infinity;
        let bestStartNode = null;
        let bestEndNode = null;

        for (let sId of startEntrances) {
            if (!this.nodes[String(sId)]) {
                console.warn(`findTwoPaths: start entrance ${sId} not found in nodes; skipping`);
                continue;
            }
            for (let tId of endEntrances) {
                if (!this.nodes[String(tId)]) {
                    console.warn(`findTwoPaths: end entrance ${tId} not found in nodes; skipping`);
                    continue;
                }
                if (String(sId) === String(tId)) continue;

                // fresh connections for each trial
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

        // alternative path using same entrance pair
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
        if (!pathIds || pathIds.length < 2) return 0;
        let cost = 0;
        for (let i = 0; i < pathIds.length - 1; i++) {
            const u = String(pathIds[i]);
            const v = String(pathIds[i + 1]);
            if (this.currentConnections[u] && this.currentConnections[u][v] != null) {
                cost += this.currentConnections[u][v];
            } else {
                // missing edge — penalize heavily to avoid choosing broken paths
                cost += 1e6;
            }
        }
        return cost;
    }

    penalizePath(pathIds) {
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
            qForward.sort((a, b) => a[0] - b[0]);
            let [_, u] = qForward.shift();
            if (visitedForward.has(u)) continue;
            visitedForward.add(u);
            if (visitedBackward.has(u)) { meetingNode = u; break; }
            this.expand(u, forwardDist, qForward, forwardParent, t);

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
        if (dists[u] === undefined) {
            console.warn(`expand: distance for ${uKey} undefined — skipping expansion`);
            return;
        }
        const neighbors = this.currentConnections[uKey] || {};
        const Types = CampusCellType || { OBSTACLE: 1, RESTRICTED: 9, CONSTRUCTION: 10, STAIRS: 6 };

        for (let v in neighbors) {
            const nodeInfo = this.nodes[v];
            if (!nodeInfo) {
                console.warn(`expand: node ${v} missing from nodes — skipping neighbor`);
                continue;
            }
            if ([Types.OBSTACLE, Types.RESTRICTED, Types.CONSTRUCTION].includes(nodeInfo.type)) {
                continue;
            }

            let weight = neighbors[v];
            if (nodeInfo.type === Types.STAIRS) weight += 2;

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

    nodesToCoords(pathIds) {
        if (!pathIds || pathIds.length === 0) return [];
        const out = [];
        for (let id of pathIds) {
            const key = String(id);
            if (!this.nodes[key]) {
                console.warn(`nodesToCoords: node ${key} missing — skipping`);
                continue;
            }
            out.push({ x: this.nodes[key].x, y: this.nodes[key].y });
        }
        return out;
    }
}