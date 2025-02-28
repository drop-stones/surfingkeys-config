import path from "path"
import os from "os"
import fs from "fs"

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

    if (!preferences.vivaldi) {
      preferences.vivaldi = {};
    }
    if (!preferences.vivaldi.actions) {
      preferences.vivaldi.actions = [{}];
    }

    // Add forward tab switching by `L`
    if (!preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_FORWARD_SETTING) {
      preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_FORWARD_SETTING = { shortcuts: [] };
    }
    const tab_switch_forward_shortcuts = preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_FORWARD_SETTING.shortcuts;
    if (!tab_switch_forward_shortcuts.includes("shift+l")) {
      tab_switch_forward_shortcuts.push("shift+l");
    }

    // Add backward tab switching by `H`
    if (!preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_BACK_SETTING) {
      preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_BACK_SETTING = { shortcuts: [] };
    }
    const tab_switch_back_shortcuts = preferences.vivaldi.actions[0].COMMAND_TAB_SWITCH_BACK_SETTING.shortcuts;
    if (!tab_switch_back_shortcuts.includes("shift+h")) {
      tab_switch_back_shortcuts.push("shift+h");
    }

    // Hide tab visualization
    if (!preferences.vivaldi.tabs) {
      preferences.vivaldi.tabs = {};
    }
    if (!preferences.vivaldi.tabs.visual_switch) {
      preferences.vivaldi.tabs.visual_switch = {};
    }
    preferences.vivaldi.tabs.visual_switch.enable = false;

    fs.writeFileSync(preferencesPath, JSON.stringify(preferences, null, 2), "utf-8");
    console.log("Setup vivaldi");
    return preferences;
  } catch (error) {
    console.error("Error reading or parsing Preferences file: ", error);
    return null;
  }
}

updateVivaldiPreferences();
