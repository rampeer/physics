import glob
import json
import logging
import os.path as path
import subprocess
import sys


def recompile_typescripts():
    try:
        with open("data/last_update.json", "r") as f:
            last_updated = json.load(f)
    except:
        last_updated = {}

    files = glob.glob("templates/static/*.ts")

    updated_files = []
    for f in files:
        update_dt = path.getmtime(f)
        if f not in last_updated or update_dt > last_updated[f] + 1e-5:
            last_updated[f] = update_dt
            updated_files.append(f)
    if updated_files:
        logging.info("Detected updated files: ", updated_files)
        logging.info(subprocess.call("C:/Users/V/AppData/Roaming/npm/tsc.cmd"))
    with open("data/last_update.json", "w") as f:
        json.dump(last_updated, f, indent=4)


recompile_typescripts()
