// =========================================================================
//  UNC MAPS - CENTRAL HUB (INDEX)
// =========================================================================

// -------------------------------------------------------------------------
//  1. USER-FACING SELECTABLE DATA (ROOM LISTS PER FLOOR)
// -------------------------------------------------------------------------
// AMS Subfolder
export { default as amsF1Data } from './data/ams/ams_f1.json';
export { default as amsF2Data } from './data/ams/ams_f2.json';
export { default as amsF3Data } from './data/ams/ams_f3.json';

// DHS Subfolder
export { default as dhsF1Data } from './data/dhs/dhs_f1.json';

// EN Subfolder
export { default as enF1Data } from './data/en/en_f1.json';
export { default as enF2Data } from './data/en/en_f2.json';

// JH Subfolder
export { default as jhF1Data } from './data/jh/jh_f1.json';
export { default as jhF2Data } from './data/jh/jh_f2.json';

// ME Subfolder
export { default as meF1Data } from './data/me/me_f1.json';
export { default as meF2Data } from './data/me/me_f2.json';

export { default as campusData } from './data/campus_map.json';

// -------------------------------------------------------------------------
//  2. PATHFINDING MAP ROUTES (MASTER SINGLE GRAPH PER BUILDING)
// -------------------------------------------------------------------------
export { default as amsRouting } from './data/ams/ams_routing.json';
export { default as dhsRouting } from './data/dhs/dhs_routing.json';
export { default as enRouting } from './data/en/en_routing.json';
export { default as jhRouting } from './data/jh/jh_routing.json';
export { default as meRouting } from './data/me/me_routing.json';
export { default as campusRouting } from './data/campus_map_routing.json';


// -------------------------------------------------------------------------
//  3. SVG MAP LAYOUTS (DIRECT IMPORTS)
// -------------------------------------------------------------------------
export { default as AmsF1Map } from './buildings/ams_building/ams_floor1.js';
export { default as AmsF2Map } from './buildings/ams_building/ams_floor2.js';
export { default as AmsF3Map } from './buildings/ams_building/ams_floor3.js';

export { default as DhsF1Map } from './buildings/dhs_building/dhs_floor1.js';

export { default as EnF1Map } from './buildings/en_building/en_floor1.js';
export { default as EnF2Map } from './buildings/en_building/en_floor2.js';

export { default as JhF1Map } from './buildings/jh_building/jh_floor1.js';
export { default as JhF2Map } from './buildings/jh_building/jh_floor2.js';

export { default as MeF1Map } from './buildings/me_building/me_floor1.js';
export { default as MeF2Map } from './buildings/me_building/me_floor2.js';

export { default as CampusMap } from './buildings/campus_map.js';