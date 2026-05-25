// PathInterpreter.js

// 1 pixel = 0.05 meters (Adjust based on your UI canvas mapping scale)
const PIXELS_TO_METERS = 0.05; 

// Pass the active building graphData explicitly to safely evaluate nodes
const getNode = (nodeOrId, graphData) => {
    if (!nodeOrId || !graphData || !graphData.nodes) return null;
    if (typeof nodeOrId === 'object' && nodeOrId.x !== undefined) return nodeOrId;
    if (typeof nodeOrId === 'string') return graphData.nodes[nodeOrId];
    if (nodeOrId.id && graphData.nodes[nodeOrId.id]) return graphData.nodes[nodeOrId.id];
    return null;
};

const getDistance = (n1, n2) => {
    const dx = n1.x - n2.x;
    const dy = n1.y - n2.y;
    return Math.sqrt(dx * dx + dy * dy) * PIXELS_TO_METERS;
};

const getAngle = (p1, p2) => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
};

const getTurnDirection = (angle1, angle2) => {
    let diff = angle2 - angle1;
    while (diff <= -180) diff += 360;
    while (diff > 180) diff -= 360;

    if (diff > 45) return "Turn Right";
    if (diff < -45) return "Turn Left";
    return null; // Straight
};

// EXPORT: Accepts the graph data alongside the calculated path array!
export const generateInstructions = (path, graphData) => {
    const instructions = [];
    if (!path || path.length < 2 || !graphData) return instructions;

    const startNode = getNode(path[0], graphData);
    instructions.push(startNode && startNode.id 
        ? `Start navigation at ${startNode.id.replace(/_/g, ' ').toUpperCase()}` 
        : "Start navigation");

    let currentStraightDist = 0; 

    for (let i = 1; i < path.length - 1; i++) {
        const prev = getNode(path[i - 1], graphData);
        const curr = getNode(path[i], graphData);
        const next = getNode(path[i + 1], graphData);

        if (!prev || !curr || !next) continue;

        currentStraightDist += getDistance(prev, curr);

        const angle1 = getAngle(prev, curr);
        const angle2 = getAngle(curr, next);
        const turn = getTurnDirection(angle1, angle2);

        if (turn) {
            if (currentStraightDist > 0) {
                instructions.push(`Go straight for ${Math.round(currentStraightDist)}m`);
                currentStraightDist = 0; 
            }
            let locationName = curr.name || curr.id.replace(/_/g, ' ').toUpperCase();
            instructions.push(`${turn} at ${locationName}`);
        }
    }

    const secondToLast = getNode(path[path.length - 2], graphData);
    const last = getNode(path[path.length - 1], graphData);
    
    if (secondToLast && last) {
        currentStraightDist += getDistance(secondToLast, last);
    }

    if (currentStraightDist > 0) {
        instructions.push(`Continue straight for ${Math.round(currentStraightDist)}m`);
    }

    const endNode = getNode(path[path.length - 1], graphData);
    instructions.push(endNode 
        ? `You have arrived at your destination: ${endNode.id.replace(/_/g, ' ').toUpperCase()}`
        : "You have arrived at your destination.");

    return instructions;
};