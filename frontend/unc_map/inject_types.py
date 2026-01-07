import json
import os

# Define the numeric mapping based on your CampusCellType enum
TYPE_MAPPING = {
    "entrance": 4,      # BUILDING_ENTRANCE
    "intersection": 2,  # MAIN_WALKWAY
    "gate": 12,        # EMERGENCY_EXITS
    "canteen": 8,      # GROUNDS/LANDMARK
    "monument": 8,
    "toblerone": 8,
    "fountain": 8,
    "arch": 8,
    "stair": 6,        # STAIRS
}

def inject_types():
    file_path = 'nodes.json' # Make sure this matches your filename
    
    if not os.path.exists(file_path):
        print("Error: nodes.json not found!")
        return

    with open(file_path, 'r') as f:
        data = json.load(f)

    for node_id, info in data['nodes'].items():
        node_name = info['id'].lower()
        
        # Default type is 2 (Walkway) if no keyword is found
        assigned_type = 2 
        
        # Check for keywords in the ID name
        for keyword, type_value in TYPE_MAPPING.items():
            if keyword in node_name:
                assigned_type = type_value
                break
        
        # Add the type to the node object
        info['type'] = assigned_type

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
    
    print("Successfully injected types into nodes.json!")

if __name__ == "__main__":
    inject_types()