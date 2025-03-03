import path from "path"
import os from "os"
import fs from "fs"

const ensureJsonKey = (obj, path) => {
  return path.split('.').reduce((acc, key) => {
    if (!(key in acc))
      acc[key] = {};
    return acc[key];
  }, obj);
}

const registerShortcuts = (obj, commandName, ...shortcuts) => {
  for (const shortcut of shortcuts) {
    obj[commandName].shortcuts.push(shortcut);
  }
}

const clearShortcuts = (actions) => {
  Object.values(actions).forEach(command => {
    command.shortcuts = [];
  })
}

const getVivaldiPreferencesPath = () => {
  let preferencesPath;
  switch (os.platform()) {
    case "win32":
      preferencesPath = path.join(os.homedir(), "AppData", "Local", "Vivaldi", "User Data", "Default", "Preferences");
      break;
    case "darwin":
      preferencesPath = path.join(os.homedir(), "Library", "Application Support", "Vivaldi", "User Data", "Default", "Preferences");
      break;
    case "linux":
      preferencesPath = path.join(os.homedir(), ".config", "vivaldi", "User Data", "Default", "Preferences");
      break;
    default:
      throw new Error("Unsupported OS");
  }
  return preferencesPath;
}

const updateVivaldiPreferences = () => {
  const preferencesPath = getVivaldiPreferencesPath();
  try {
    const data = fs.readFileSync(preferencesPath, "utf-8");
    const preferences = JSON.parse(data);

    const actions = ensureJsonKey(preferences, 'vivaldi').actions[0];
    clearShortcuts(actions);

    // tab
    registerShortcuts(actions, "COMMAND_TAB_SWITCH_FORWARD_SETTING", "shift+l"); // forward tab switching
    registerShortcuts(actions, "COMMAND_TAB_SWITCH_BACK_SETTING", "shift+h"); // backward tab switching

    // shortcuts settings
    ensureJsonKey(preferences, 'vivaldi').actions = [actions];

    ensureJsonKey(preferences, 'vivaldi.tabs.visual_switch').enable = false; // Hide tab visualization

    fs.writeFileSync(preferencesPath, JSON.stringify(preferences, null, 2), "utf-8");
    console.log("Setup vivaldi");
    return preferences;
  } catch (error) {
    console.error("Error reading or parsing Preferences file: ", error);
    return null;
  }
}

updateVivaldiPreferences();
