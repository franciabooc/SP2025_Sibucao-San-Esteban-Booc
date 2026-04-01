from enum import Enum

class CampusCellType(Enum):
    """Cell types specific to campus environments."""
    EMPTY = 0
    OBSTACLE = 1
    MAIN_WALKWAY = 2
    SECONDARY_PATH = 3
    BUILDING_ENTRANCE = 4
    COVERED_WALKWAY = 5
    STAIRS = 6
    RAMP = 7
    GROUNDS = 8
    RESTRICTED = 9
    CONSTRUCTION = 10
    BUILDING = 11
    ROOMS = 12
    EMERGENCY_EXITS = 13
    EVECUATION_AREA = 14
