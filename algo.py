import heapq
import time
from cell_type import CampusCellType


class AStar:
    def __init__(self, n, adj, cost, x, y, node_types=None):
        self.n = n
        self.adj = adj
        self.cost = cost
        self.x = x
        self.y = y
        self.node_types = node_types if node_types else {}

        self.inf = float("inf")
        self.d = [[self.inf] * n for _ in range(2)]
        self.visited = [set(), set()]
        self.workset = []

    def clear(self):
        for v in self.workset:
            self.d[0][v] = self.d[1][v] = self.inf
        self.visited = [set(), set()]
        self.workset = []

    def potential(self, u, side):
        return abs(self.d[0][u] - self.d[1][u])

    def visit(self, q, side, v, dist, parent, parents):
        if self.d[side][v] > dist:
            self.d[side][v] = dist
            heapq.heappush(q, (dist + self.potential(v, side), v))
            parents[side][v] = parent
            self.workset.append(v)

    def query(self, s, t):
        """Run bidirectional A* between s and t, return (path, runtime_seconds)."""
        if s == t:
            return [s], 0.0

        start_time = time.time()

        self.clear()
        q = [[], []]
        parents = [{}, {}]

        self.visit(q[0], 0, s, 0, None, parents)
        self.visit(q[1], 1, t, 0, None, parents)

        best_dist = self.inf
        meeting_node = -1

        while q[0] and q[1]:
            # Forward
            _, u = heapq.heappop(q[0])
            if u in self.visited[0]:
                continue
            self.visited[0].add(u)

            for i, v in enumerate(self.adj[u]):
                cell_type = self.node_types.get(v, CampusCellType.EMPTY)
                if cell_type in (
                    CampusCellType.OBSTACLE,
                    CampusCellType.RESTRICTED,
                    CampusCellType.CONSTRUCTION,
                ):
                    continue

                edge_cost = self.cost[u][i]
                if cell_type == CampusCellType.STAIRS:
                    edge_cost += 2

                self.visit(q[0], 0, v, self.d[0][u] + edge_cost, u, parents)

            if u in self.visited[1]:
                total_dist = self.d[0][u] + self.d[1][u]
                if total_dist < best_dist:
                    best_dist = total_dist
                    meeting_node = u

            # Backward
            _, u = heapq.heappop(q[1])
            if u in self.visited[1]:
                continue
            self.visited[1].add(u)

            for i, v in enumerate(self.adj[u]):
                cell_type = self.node_types.get(v, CampusCellType.EMPTY)
                if cell_type in (
                    CampusCellType.OBSTACLE,
                    CampusCellType.RESTRICTED,
                    CampusCellType.CONSTRUCTION,
                ):
                    continue

                edge_cost = self.cost[u][i]
                if cell_type == CampusCellType.STAIRS:
                    edge_cost += 2

                self.visit(q[1], 1, v, self.d[1][u] + edge_cost, u, parents)

            if u in self.visited[0]:
                total_dist = self.d[0][u] + self.d[1][u]
                if total_dist < best_dist:
                    best_dist = total_dist
                    meeting_node = u

        runtime = time.time() - start_time

        if meeting_node == -1:
            return [], runtime

        return self.reconstruct_path(parents, s, t, meeting_node), runtime

    def reconstruct_path(self, parents, s, t, meeting_node):
        path = []
        node = meeting_node
        while node is not None:
            path.append(node)
            node = parents[0].get(node)
        path.reverse()

        node = parents[1].get(meeting_node)
        while node is not None:
            path.append(node)
            node = parents[1].get(node)

        return path

    def find_multiple_paths(self, s, t, k=2, block_used=True):
        """
        Find up to k paths.
        - If block_used=True, block edges of previous path to force alternates.
        - If block_used=False, only penalize edges (may repeat).
        """
        paths = []
        for _ in range(k):
            path, runtime = self.query(s, t)
            if not path:
                break
            paths.append((path, runtime))

            if block_used:
                # Block edges of this path
                for i in range(len(path) - 1):
                    u, v = path[i], path[i + 1]
                    # Remove v from u’s adjacency
                    if v in self.adj[u]:
                        idx = self.adj[u].index(v)
                        self.adj[u].pop(idx)
                        self.cost[u].pop(idx)
            else:
                # Just penalize instead of removing
                for i in range(len(path) - 1):
                    u, v = path[i], path[i + 1]
                    for j, neighbor in enumerate(self.adj[u]):
                        if neighbor == v:
                            self.cost[u][j] += 10

        return paths
