import json
import os

# --- CONFIGURATION ---
TYPE_MAPPING = {
    "entrance": 4,      # BUILDING_ENTRANCE
    "intersection": 2,  # MAIN_WALKWAY
    "stair": 6,         # STAIRS
}

STAIR_IDS = ["n34", "n35", "n36", "n37"] 

def fix_and_inject():
    # 1. Locate the file
    script_folder = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_folder, 'nodes_and_connections.json')

    print(f"🔎 Reading file: {file_path}")
    if not os.path.exists(file_path):
        print("❌ ERROR: File not found!")
        return

    with open(file_path, 'r') as f:
        data = json.load(f)

    old_nodes = data['nodes']
    old_connections = data['connections']

    new_nodes = {}
    new_connections = {}
    key_map = {} # Maps Old Key ("1") -> New ID ("ams_100")

    print("🔄 Processing Nodes (Fixing Keys & Types)...")

    # --- STEP 1: Process Nodes ---
    for key, info in old_nodes.items():
        # Get the actual ID (e.g., "ams_100")
        actual_id = info['id']
        key_map[key] = actual_id
        
        # --- TYPE INJECTION ---
        node_name_lower = actual_id.lower()
        assigned_type = 5 # Default: Covered Walkway
        
        if actual_id in STAIR_IDS or "stair" in node_name_lower:
            assigned_type = 6
        else:
            for keyword, type_val in TYPE_MAPPING.items():
                if keyword in node_name_lower:
                    assigned_type = type_val
                    break
        
        info['type'] = assigned_type
        
        # SAVE WITH NEW KEY
        new_nodes[actual_id] = info

    print("🔗 Remapping Connections...")

    # --- STEP 2: Fix Connections ---
    for source_key, targets in old_connections.items():
        # Only process if we know the new ID
        if source_key not in key_map: continue
        
        new_source_id = key_map[source_key]
        new_connections[new_source_id] = {}

        for target_key, distance in targets.items():
            if target_key in key_map:
                new_target_id = key_map[target_key]
                new_connections[new_source_id][new_target_id] = distance

    # --- STEP 3: Save Changes ---
    data['nodes'] = new_nodes
    data['connections'] = new_connections

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

    print("-" * 40)
    print(f"✅ SUCCESS! Database updated.")
    print("   1. Keys now match IDs (e.g., '1' -> 'ams_100')")
    print("   2. Types are set (Stairs = 6, Walkways = 5)")

if __name__ == "__main__":
    fix_and_inject()