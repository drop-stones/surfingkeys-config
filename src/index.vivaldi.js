import conf_settings from "./settings.js"
import keys from "./keys.js"
import search_engines from "./search-engines.js"
import register from "./register.js"

// settings
Object.assign(settings, conf_settings);

// keys
register.unregisterKeys(keys.unmaps);
register.registerKeys(keys.maps);

// search engines
register.registerSearchEngines(search_engines);

// vivaldi-specific settings
const unmaps = {
  global: {
    normal: [
      // #3 Tabs
      "H", // Go one tab left
      "L", // Go one tab right
      "x", // Close current tab
      "<", // Move current tab to left
      ">", // Move current tab to right
    ]
  }
}

register.unregisterKeys(unmaps);
