import graphData from './nodes_and_connections.json';

// Detects the floor based on Node ID or Node Object
export const getNodeFloor = (node) => {
    // 1. Resolve the ID (Handle both "String IDs" and "Node Objects")
    let id;
    if (typeof node === 'string') {
        id = node;
    } else if (node && node.id) {
        id = node.id;
        if (node.floor) return node.floor; // Use explicit property if available
    } else {
        return 1; // Fallback
    }

    // 2. HEURISTIC: Detect floor based on ID patterns
    if (id.includes('_L2')) return 2;
    if (id.includes('_L1')) return 1;
    if (id.startsWith('ams_2')) return 2;
    if (id.startsWith('ams_1')) return 1;

    // Intersections: 29+ are on Floor 2
    if (id.startsWith('intersection_')) {
        const num = parseInt(id.split('_')[1], 10);
        return num >= 29 ? 2 : 1;
    }

    // Numeric IDs (72-150 are Floor 2 based on JSON)
    if (!isNaN(id)) {
         const numId = parseInt(id, 10);
         if (numId >= 70 && numId <= 150) return 2;
    }

    // Restrooms ending in _2 are Floor 2
    if (id.includes('restroom') && id.endsWith('_2')) return 2;

    // Nodes: "node 111" etc. are Floor 2
    if (id.startsWith('node ')) {
        const num = parseInt(id.split(' ')[1], 10);
        if (num > 100) return 2;
    }

    return 1; // Default
};