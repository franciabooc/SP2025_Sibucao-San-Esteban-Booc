<<<<<<< HEAD
from cell_type import CampusCellType
from algo import AStar
from utils import pretty_path


if __name__ == "__main__":
    n = 7
    adj = [
        [1],          # 0
        [0, 2, 5],    # 1
        [1, 3],       # 2
        [2, 4, 6],    # 3
        [3],          # 4
        [1, 6],       # 5
        [5, 3],       # 6
    ]
    cost = [
        [1],          # 0
        [1, 1, 2],    # 1
        [1, 1],       # 2
        [1, 1, 2],    # 3
        [1],          # 4
        [2, 2],       # 5
        [2, 2],       # 6
    ]
    x = [0, 1, 2, 3, 4, 2, 3]
    y = [0, 0, 0, 0, 0, 1, 1]

    node_types = {
        0: CampusCellType.MAIN_WALKWAY,
        1: CampusCellType.MAIN_WALKWAY,
        2: CampusCellType.STAIRS,
        3: CampusCellType.BUILDING_ENTRANCE,
        4: CampusCellType.ROOMS,
        5: CampusCellType.CONSTRUCTION,
        6: CampusCellType.SECONDARY_PATH,
    }

    print("Campus Node Legend:")
    for node, cell_type in node_types.items():
        print(f"  Node {node}: {cell_type.name}")
    print("-" * 40)

    astar = AStar(n, adj, cost, x, y, node_types=node_types)

    # Single path with time
    path, runtime = astar.query(0, 4)
    print(f"Shortest path: {pretty_path(path, node_types)} (found in {runtime:.6f} sec)")

    # Multiple paths with blocking
    paths = astar.find_multiple_paths(0, 4, k=2, block_used=True)
    print("\nMultiple paths:")
    for i, (p, rt) in enumerate(paths, 1):
        print(f"  Path {i}: {pretty_path(p, node_types)} (found in {rt:.6f} sec)")
=======
from cell_type import CampusCellType
from algo import AStar
from utils import pretty_path


if __name__ == "__main__":
    n = 7
    adj = [
        [1],          # 0
        [0, 2, 5],    # 1
        [1, 3],       # 2
        [2, 4, 6],    # 3
        [3],          # 4
        [1, 6],       # 5
        [5, 3],       # 6
    ]
    cost = [
        [1],          # 0
        [1, 1, 2],    # 1
        [1, 1],       # 2
        [1, 1, 2],    # 3
        [1],          # 4
        [2, 2],       # 5
        [2, 2],       # 6
    ]
    x = [0, 1, 2, 3, 4, 2, 3]
    y = [0, 0, 0, 0, 0, 1, 1]

    node_types = {
        0: CampusCellType.MAIN_WALKWAY,
        1: CampusCellType.MAIN_WALKWAY,
        2: CampusCellType.STAIRS,
        3: CampusCellType.BUILDING_ENTRANCE,
        4: CampusCellType.ROOMS,
        5: CampusCellType.CONSTRUCTION,
        6: CampusCellType.SECONDARY_PATH,
    }

    print("Campus Node Legend:")
    for node, cell_type in node_types.items():
        print(f"  Node {node}: {cell_type.name}")
    print("-" * 40)

    astar = AStar(n, adj, cost, x, y, node_types=node_types)

    # Single path with time
    path, runtime = astar.query(0, 4)
    print(f"Shortest path: {pretty_path(path, node_types)} (found in {runtime:.6f} sec)")

    # Multiple paths with blocking
    paths = astar.find_multiple_paths(0, 4, k=2, block_used=True)
    print("\nMultiple paths:")
    for i, (p, rt) in enumerate(paths, 1):
        print(f"  Path {i}: {pretty_path(p, node_types)} (found in {rt:.6f} sec)")
>>>>>>> 0530c2b7aea88051a356ec3ac9f6ac9b205a2e62
