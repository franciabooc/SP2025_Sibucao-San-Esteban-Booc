// FloorUtils.js

// Detects the floor cleanly based on your explicit Node ID string or Object
export const getNodeFloor = (node) => {
    let id;
    if (typeof node === 'string') {
        id = node;
    } else if (node && node.id) {
        id = node.id;
        if (node.floor) return node.floor; // Use explicit property if available
    } else {
        return 1; // Fallback
    }

    // Capture explicit floor signatures inside your node ID string
    if (id.includes('_f1_')) return 1;
    if (id.includes('_f2_')) return 2;
    if (id.includes('_f3_')) return 3;

    // Backward compatibility backup checks (e.g. legacy name structures)
    if (id.includes('_L2') || id.startsWith('ams_2')) return 2;
    if (id.includes('_L1') || id.startsWith('ams_1')) return 1;

    return 1; // Default fallback if no floor pattern is matched
};