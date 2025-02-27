import conf_settings from "./settings.js"
import keys from "./keys.js"
import search_engines from "./search-engines.js"
import register from "./register.js"
import utils from "./utils.js"

// vivaldi-specific settings
const unmaps = {
  global: {
    normal: [
      "H", // Open opened URL in current tab
      "x", // Close current tab
    ]
  }
}
keys.unmaps = utils.mergeMaps(keys.unmaps, unmaps);

// settings
Object.assign(settings, conf_settings);

// keys
register.unregisterKeys(keys.unmaps);
register.registerKeys(keys.maps);

// search engines
register.registerSearchEngines(search_engines);
