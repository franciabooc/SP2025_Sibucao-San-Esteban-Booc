import graphData from './nodes_and_connections.json';

// --- CONFIGURATION ---
// 1 pixel = 0.05 meters (Adjust based on the real building scale)
const PIXELS_TO_METERS = 0.05; 

const getNode = (nodeOrId) => {
    if (!nodeOrId) return null;
    if (typeof nodeOrId === 'object' && nodeOrId.x !== undefined) return nodeOrId;
    if (typeof nodeOrId === 'string') return graphData.nodes[nodeOrId];
    if (nodeOrId.id && graphData.nodes[nodeOrId.id]) return graphData.nodes[nodeOrId.id];
    return null;
};

const getDistance = (n1, n2) => {
    const dx = n1.x - n2.x;
    const dy = n1.y - n2.y;
    const pixelDist = Math.sqrt(dx * dx + dy * dy);
    return pixelDist * PIXELS_TO_METERS;
};

const getAngle = (p1, p2) => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
};

const getTurnDirection = (angle1, angle2) => {
    let diff = angle2 - angle1;
    while (diff <= -180) diff += 360;
    while (diff > 180) diff -= 360;

    // Strictly Left or Right. 
    // Ignore small wiggles (< 45 degrees).
    if (diff > 45) return "Turn Right";
    if (diff < -45) return "Turn Left";
    
    return null; // Straight
};

export const generateInstructions = (path) => {
    const instructions = [];

    if (!path || path.length < 2) return instructions;

    // 1. Start Instruction
    const startNode = getNode(path[0]);
    instructions.push(startNode && startNode.name 
        ? `Start at ${startNode.name}` 
        : "Start navigation");

    let currentStraightDist = 0; 

    for (let i = 1; i < path.length - 1; i++) {
        const prev = getNode(path[i - 1]);
        const curr = getNode(path[i]);
        const next = getNode(path[i + 1]);

        if (!prev || !curr || !next) continue;

        currentStraightDist += getDistance(prev, curr);

        const angle1 = getAngle(prev, curr);
        const angle2 = getAngle(curr, next);
        const turn = getTurnDirection(angle1, angle2);

        // A) If there is a turn, output the accumulated straight distance first
        if (turn) {
            if (currentStraightDist > 0) {
                instructions.push(`Go straight for ${Math.round(currentStraightDist)}m`);
                currentStraightDist = 0; 
            }

            let step = turn;
            if (curr.name) {
                step += ` at ${curr.name}`;
            }
            instructions.push(step);
        } 
        // B) Optional: Mention Landmarks if we walk past them
        else if (curr.name) {
             if (currentStraightDist > 5) {
                 instructions.push(`Pass by ${curr.name} (${Math.round(currentStraightDist)}m)`);
                 currentStraightDist = 0; 
             }
        }
    }

    // 3. Add final leg distance
    const secondToLast = getNode(path[path.length - 2]);
    const last = getNode(path[path.length - 1]);
    
    if (secondToLast && last) {
        currentStraightDist += getDistance(secondToLast, last);
    }

    if (currentStraightDist > 0) {
        instructions.push(`Continue straight for ${Math.round(currentStraightDist)}m`);
    }

    return instructions;
};