from cell_type import CampusCellType
from algo import AStar
from utils import pretty_path


def get_user_input(n, node_names):
    """Get valid start and end nodes from user input."""
    print("Campus Location Map:")
    for node, name in node_names.items():
        print(f"  Node {node}: {name}")
    print("-" * 50)
    
    while True:
        try:
            start = int(input(f"Enter starting node (0-{n-1}): "))
            if 0 <= start < n:
                break
            else:
                print(f"Please enter a number between 0 and {n-1}")
        except ValueError:
            print("Please enter a valid integer")
    
    while True:
        try:
            end = int(input(f"Enter destination node (0-{n-1}): "))
            if 0 <= end < n:
                break
            else:
                print(f"Please enter a number between 0 and {n-1}")
        except ValueError:
            print("Please enter a valid integer")
    
    return start, end


def pretty_path_with_names(path, node_names):
    """Format path with building/room names instead of cell types."""
    return [f"{node} ({node_names[node]})" for node in path]


if __name__ == "__main__":
    n = 15
    adj = [
        [1, 5],            # 0
        [0, 2, 6],         # 1
        [1, 3, 7],         # 2
        [2, 4, 8],         # 3
        [3, 9],            # 4
        [0, 6, 10],        # 5
        [1, 5, 7, 11],     # 6
        [2, 6, 8, 12],     # 7
        [3, 7, 9, 13],     # 8
        [4, 8, 14],        # 9
        [5, 11],           # 10
        [6, 10, 12],       # 11
        [7, 11, 13],       # 12
        [8, 12, 14],       # 13
        [9, 13],           # 14
    ]
    cost = [
        [1, 2],            # 0
        [1, 2, 2],         # 1
        [1, 2, 2],         # 2
        [1, 2, 2],         # 3
        [1, 3],            # 4
        [2, 2, 3],         # 5
        [2, 2, 2, 3],      # 6
        [2, 2, 2, 3],      # 7
        [2, 2, 2, 3],      # 8
        [3, 3, 1],         # 9
        [3, 2],            # 10
        [2, 3, 2],         # 11
        [2, 2, 3],         # 12
        [3, 2, 1],         # 13
        [1, 3],            # 14
    ]
    # coordinates (rough grid layout)
    x = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
    y = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2]

    # assign different cell types for pathfinding logic
    node_types = {
        0: CampusCellType.MAIN_WALKWAY,
        1: CampusCellType.MAIN_WALKWAY,
        2: CampusCellType.STAIRS,
        3: CampusCellType.BUILDING_ENTRANCE,
        4: CampusCellType.ROOMS,
        5: CampusCellType.SECONDARY_PATH,
        6: CampusCellType.CONSTRUCTION,
        7: CampusCellType.MAIN_WALKWAY,
        8: CampusCellType.SECONDARY_PATH,
        9: CampusCellType.BUILDING_ENTRANCE,
        10: CampusCellType.STAIRS,
        11: CampusCellType.SECONDARY_PATH,
        12: CampusCellType.MAIN_WALKWAY,
        13: CampusCellType.ROOMS,
        14: CampusCellType.ROOMS,
    }

    # assign building and room names for display
    node_names = {
        0: "JH Building Main Entrance",
        1: "New Building Entrance",
        2: "AMS Building Stairs",
        3: "EA Building Entrance",
        4: "JH Building - JH26 (2nd Floor)",
        5: "DHS Building Walkway",
        6: "Library Construction Area",
        7: "Science Building Entrance",
        8: "Chapel Pathway",
        9: "JH Building - JH27 (2nd Floor)",
        10: "Library Stairs",
        11: "AMSCO Office",
        12: "JH Building - Registrar (1st Floor)",
        13: "JH Building - SCIS Dean's Office (2nd Floor)",
        14: "Science Building Lab",
    }

    while True:
        print("\n" + "="*60)
        print("CAMPUS PATHFINDING SYSTEM")
        print("="*60)
        
        # Get user input
        start, end = get_user_input(n, node_names)
        
        print(f"\nFinding paths from {node_names[start]} to {node_names[end]}")
        print("-" * 50)

        # Create AStar instance
        astar = AStar(n, adj, cost, x, y, node_types=node_types)

        # Find primary and alternative paths automatically
        paths = astar.find_multiple_paths(start, end, k=2, block_used=True)
        
        if paths:
            print(f"Primary path: {pretty_path_with_names(paths[0][0], node_names)}")
            print(f"Runtime: {paths[0][1]:.6f} seconds")
            
            if len(paths) > 1 and paths[1][0]:
                print(f"\nAlternative path: {pretty_path_with_names(paths[1][0], node_names)}")
                print(f"Runtime: {paths[1][1]:.6f} seconds")
            else:
                print("\nNo alternative path available.")
        else:
            print("No path found between these locations!")
        # Ask if user wants to continue
        while True:
            continue_search = input("\nWould you like to find another path? (y/n): ").lower().strip()
            if continue_search in ['y', 'yes', 'n', 'no']:
                break
            print("Please enter 'y' or 'n'")
        
        if continue_search in ['n', 'no']:
            print("Thank you for using the Campus Pathfinding System!")
            break