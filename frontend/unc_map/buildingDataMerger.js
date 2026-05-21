/**
 * buildingDataMerger.js
 * 
 * This module integrates groupmate's building entrance data with the routing system.
 * Groupmate provides: building locations with entrance points
 * We need: mapping of building names to node IDs for pathfinding
 */

import buildingEntrancesData from './buildingEntrances.json';

/**
 * Convert groupmate's entrance data into routing-friendly format
 * Input: { buildingName, entrances: [{nodeId, name, type, accessible}] }
 * Output: { "Building Name": ["nodeId1", "nodeId2", ...] }
 */
export const createNameToNodeMapping = (buildings) => {
    const mapping = {};

    buildings.forEach(building => {
        const entranceNodeIds = building.entrances.map(e => e.nodeId);
        mapping[building.name] = entranceNodeIds;
    });

    return mapping;
};

/**
 * Get entrance metadata for a building
 * Useful for UI: showing which entrances are accessible, primary, etc.
 */
export const getBuildingEntrances = (buildingName) => {
    const building = buildingEntrancesData.buildings.find(b => b.name === buildingName);
    return building ? building.entrances : [];
};

/**
 * Get primary (main) entrance node for a building
 * Best for default routing
 */
export const getPrimaryEntrance = (buildingName) => {
    const entrances = getBuildingEntrances(buildingName);
    const primary = entrances.find(e => e.type === 'main');
    return primary ? primary.nodeId : entrances[0]?.nodeId;
};

/**
 * Get all accessible entrances for a building
 * Useful for users with accessibility needs
 */
export const getAccessibleEntrances = (buildingName) => {
    const entrances = getBuildingEntrances(buildingName);
    return entrances.filter(e => e.accessible).map(e => e.nodeId);
};

// Export the merged mapping for immediate use
export const groupmateNameToNodeMap = createNameToNodeMapping(buildingEntrancesData.buildings);

export default {
    createNameToNodeMapping,
    getBuildingEntrances,
    getPrimaryEntrance,
    getAccessibleEntrances,
    groupmateNameToNodeMap
};
