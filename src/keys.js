import { unmaps as priv_unmaps } from "./private.js"
import { maps as priv_maps } from "./private.js"

const mergeMaps = (maps1, maps2) => {
  const mergedMaps = {};

  const allDomains = new Set([...Object.keys(maps1), ...Object.keys(maps2)]);

  allDomains.forEach((domain) => {
    mergedMaps[domain] = {
      normal: [],
      insert: [],
      visual: [],
    };

    if (maps1[domain]) {
      mergedMaps[domain].normal = [...mergedMaps[domain].normal, ...(maps1[domain].normal || [])]
      mergedMaps[domain].insert = [...mergedMaps[domain].insert, ...(maps1[domain].insert || [])]
      mergedMaps[domain].visual = [...mergedMaps[domain].visual, ...(maps1[domain].visual || [])]
    }

    if (maps2[domain]) {
      mergedMaps[domain].normal = [...mergedMaps[domain].normal, ...(maps2[domain].normal || [])]
      mergedMaps[domain].insert = [...mergedMaps[domain].insert, ...(maps2[domain].insert || [])]
      mergedMaps[domain].visual = [...mergedMaps[domain].visual, ...(maps2[domain].visual || [])]
    }
  })

  return mergedMaps;
}

// Remove unused default mappings
var unmaps = {
  global: {
    normal: ["e"],
    insert: [],
    visual: [],
  }
}

// Add new mappings
// - map(new_keystroke, old_keystroke[, domain, new_annotation])
// - mapkey(keys, annotation,, jscode[, object])
var maps = {
  global: {
    normal: [
      {
        new_keystroke: "F",
        old_keystroke: "gf",
      },
    ],
    insert: [],
    visual: [],
  },
  // domain-specific mappings
}

if (priv_unmaps) {
  unmaps = mergeMaps(unmaps, priv_unmaps);
}

if (priv_maps) {
  maps = mergeMaps(maps, priv_maps);
}

export default {
  unmaps,
  maps,
}
