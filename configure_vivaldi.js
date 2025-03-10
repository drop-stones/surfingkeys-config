import path from "path"
import os from "os"
import fs from "fs"

const getOrSet = (map, key, defaultValue) => {
  if (!map.hasOwnProperty(key)) {
    map[key] = defaultValue;
  }
  return map[key];
}

const ensureJsonKey = (obj, path) => {
  return path.split('.').reduce((acc, key) => {
    return getOrSet(acc, key, {});
  }, obj);
}

const registerShortcuts = (obj, commandName, ...shortcuts) => {
  // Add command if not exists
  if (!obj[commandName]) {
    obj[commandName] = { shortcuts: [] };
  }

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
      preferencesPath = path.join(os.homedir(), ".config", "vivaldi", "Default", "Preferences");
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

    const actions = getOrSet(ensureJsonKey(preferences, "vivaldi"), "actions", [{}])[0];
    clearShortcuts(actions);

    // window
    registerShortcuts(actions, "COMMAND_NEW_WINDOW", "ctrl+n"); // new window
    registerShortcuts(actions, "COMMAND_NEW_PRIVATE_WINDOW", "ctrl+shift+n"); // new private window
    registerShortcuts(actions, "COMMAND_SHOW_QUICK_COMMANDS", "shift+space"); // quick command
    registerShortcuts(actions, "COMMAND_PRINT_PAGE", "ctrl+p"); // print page
    registerShortcuts(actions, "COMMAND_SHOW_HISTORY", "ctrl+h"); // history
    registerShortcuts(actions, "COMMAND_SHOW_BOOKMARKS", "ctrl+b"); // bookmark
    // view
    registerShortcuts(actions, "COMMAND_MAIN_TOGGLE_ADDRESS_BAR", "shift+a"); // address bar
    registerShortcuts(actions, "COMMAND_MAIN_TOGGLE_TAB_BAR", "ctrl+t"); // tab bar
    registerShortcuts(actions, "COMMAND_MAIN_ZOOM_IN", "ctrl++", "ctrl+="); // zoom in
    registerShortcuts(actions, "COMMAND_MAIN_ZOOM_OUT", "ctrl+-"); // zoom out
    registerShortcuts(actions, "COMMAND_FULLSCREEN", "f11"); // fullscreen
    // tab
    registerShortcuts(actions, "COMMAND_TAB_SWITCH_FORWARD_ORDER", "shift+l"); // forward tab switching
    registerShortcuts(actions, "COMMAND_TAB_SWITCH_BACK_ORDER", "shift+h"); // backward tab switching
    registerShortcuts(actions, "COMMAND_TAB_MOVE_BACKWARD", "shift+,"); // <: move tab backward
    registerShortcuts(actions, "COMMAND_TAB_MOVE_FORWARD", "shift+."); // >: move tab forward
    registerShortcuts(actions, "COMMAND_CLOSE_TAB", "ctrl+w", "x"); // close tab
    registerShortcuts(actions, "COMMAND_TAB_SWITCH_1", "ctrl+0");
    registerShortcuts(actions, "COMMAND_TAB_SWITCH_LAST", "ctrl+$");
    // page
    registerShortcuts(actions, "COMMAND_ADD_BOOKMARK", "ctrl+d"); // add bookmark
    registerShortcuts(actions, "COMMAND_FOCUS_ADDRESSFIELD", "ctrl+l"); // focus address bar
    registerShortcuts(actions, "COMMAND_FIND_IN_PAGE", "ctrl+f"); // find
    registerShortcuts(actions, "COMMAND_FIND_NEXT_IN_PAGE", "ctrl+g"); // find next
    registerShortcuts(actions, "COMMAND_FIND_PREVIOUS_IN_PAGE", "ctrl+shift+g"); // find previous
    registerShortcuts(actions, "COMMAND_PAGE_REFRESH", "ctrl+r"); // refresh
    // workspace
    registerShortcuts(actions, "COMMAND_WORKSPACE_SWITCH_BACK_ORDER", "shift+k"); // switch backward workspace
    registerShortcuts(actions, "COMMAND_WORKSPACE_SWITCH_FORWARD_ORDER", "shift+j"); // switch forward workspace

    ensureJsonKey(preferences, 'vivaldi.tabs.visual_switch').enable = false; // Hide tab visualization
    ensureJsonKey(preferences, 'vivaldi.keyboard.shortcuts').enable_single_key = true; // Enable single key shortcut

    fs.writeFileSync(preferencesPath, JSON.stringify(preferences, null, 2), "utf-8");
    console.log("Setup vivaldi");
    return preferences;
  } catch (error) {
    console.error("Error reading or parsing Preferences file: ", error);
    return null;
  }
}

updateVivaldiPreferences();
