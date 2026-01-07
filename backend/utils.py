from cell_type import CampusCellType

def pretty_path(path, node_types):
    return [f"{node} ({node_types[node].name})" for node in path]
