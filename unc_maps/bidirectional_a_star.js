import { CampusCellType } from './celltype.js';
import graphData from './nodes_and_connections.json';

export class BiAStar {
    constructor(nodesData) {
        this.nodes = nodesData.nodes;
        // Keep a "Master Copy" that never changes
        this.masterConnections = graphData.connections;
    }

    // Heuristic (Euclidean distance "as the crow flies")
    heuristic(u, v) {
        const nodeU = this.nodes[u];
        const nodeV = this.nodes[v];
        if (!nodeU || !nodeV) return 0;

        return Math.sqrt(
            Math.pow(nodeU.x - nodeV.x, 2) +
            Math.pow(nodeU.y - nodeV.y, 2)
        );
    }

    // --- MAIN METHOD TO GET BOTH PATHS ---
    findTwoPaths(sId, tId) {
        // RESET: Create a fresh working copy for THIS search session
        this.currentConnections = JSON.parse(JSON.stringify(this.masterConnections));

        const primaryPathNodes = this.query(sId, tId);

        // If primary failed, don't bother with alternative
        if (primaryPathNodes.length === 0) return { primary: [], alternative: [] };

        this.penalizePath(primaryPathNodes);
        const alternativePathNodes = this.query(sId, tId);

        return {
            // These now return FULL OBJECTS, not just coords
            primary: this.nodesToFullObjects(primaryPathNodes),
            alternative: this.nodesToFullObjects(alternativePathNodes)
        };
    }

    // --- PENALTY LOGIC ---
    penalizePath(pathIds) {
        if (!pathIds || pathIds.length < 2) return;
        for (let i = 0; i < pathIds.length - 1; i++) {
            const u = pathIds[i];
            const v = pathIds[i + 1];
            // Add a large penalty to the connection in both directions
            if (this.currentConnections[u] && this.currentConnections[u][v]) {
                this.currentConnections[u][v] += 500;
            }
            if (this.currentConnections[v] && this.currentConnections[v][u]) {
                this.currentConnections[v][u] += 500;
            }
        }
    }

    query(s, t) {
        if (!s || !t) return [];
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
            // Forward Step
            qForward.sort((a, b) => a[0] - b[0]);
            let [_, u] = qForward.shift();
            if (visitedForward.has(u)) continue;
            visitedForward.add(u);
            if (visitedBackward.has(u)) { meetingNode = u; break; }

            this.expand(u, forwardDist, qForward, forwardParent, t);

            // Backward Step
            qBackward.sort((a, b) => a[0] - b[0]);
            let [__, v] = qBackward.shift();
            if (visitedBackward.has(v)) continue;
            visitedBackward.add(v);
            if (visitedForward.has(v)) { meetingNode = v; break; }

            this.expand(v, backwardDist, qBackward, backwardParent, s);
        }

        return this.reconstructPathNodes(forwardParent, backwardParent, meetingNode);
    }

    // --- EXPAND LOGIC USING JSON WEIGHTS ---
    expand(u, dists, queue, parents, targetId) {
        const uKey = String(u);
        const neighbors = this.currentConnections[uKey] || {};

        // Create a local reference to avoid "undefined" errors
        const Types = CampusCellType || { OBSTACLE: 1, RESTRICTED: 9, CONSTRUCTION: 10, STAIRS: 6 };

        for (let v in neighbors) {
            const nodeInfo = this.nodes[v];
            if (!nodeInfo) continue;

            // 1. OBSTACLE LOGIC
            if ([Types.OBSTACLE, Types.RESTRICTED, Types.CONSTRUCTION].includes(nodeInfo.type)) {
                continue;
            }

            let weight = neighbors[v];

            // 2. STAIRS PENALTY
            if (nodeInfo.type === Types.STAIRS) {
                weight += 2;
            }

            let newDist = dists[u] + weight;
            if (dists[v] === undefined || newDist < dists[v]) {
                dists[v] = newDist;
                let priority = newDist + this.heuristic(v, targetId);
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

    // --- CRITICAL FIX: Return Full Objects ---
    nodesToFullObjects(pathIds) {
        return pathIds.map(id => {
            const node = this.nodes[id];
            // Return the full node object spread (...node) + ensure ID is included
            // If node lookup fails, return a safe fallback object
            return node ? { ...node, id: id } : { id: id, x: 0, y: 0 };
        });
    }
}