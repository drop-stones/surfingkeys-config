const mergeMaps = (maps1, maps2) => {
  const mergedMaps = {};

  const allDomains = new Set([...Object.keys(maps1), ...Object.keys(maps2)]);

  allDomains.forEach((domain) => {
    mergedMaps[domain] = {
      normal: [],
      insert: [],
      visual: [],
      omnibar: [],
    };

    if (maps1[domain]) {
      mergedMaps[domain].normal = [...mergedMaps[domain].normal, ...(maps1[domain].normal || [])]
      mergedMaps[domain].insert = [...mergedMaps[domain].insert, ...(maps1[domain].insert || [])]
      mergedMaps[domain].visual = [...mergedMaps[domain].visual, ...(maps1[domain].visual || [])]
      mergedMaps[domain].omnibar = [...mergedMaps[domain].omnibar, ...(maps1[domain].omnibar || [])]
    }

    if (maps2[domain]) {
      mergedMaps[domain].normal = [...mergedMaps[domain].normal, ...(maps2[domain].normal || [])]
      mergedMaps[domain].insert = [...mergedMaps[domain].insert, ...(maps2[domain].insert || [])]
      mergedMaps[domain].visual = [...mergedMaps[domain].visual, ...(maps2[domain].visual || [])]
      mergedMaps[domain].omnibar = [...mergedMaps[domain].omnibar, ...(maps2[domain].omnibar || [])]
    }
  })

  return mergedMaps;
}

export default {
  mergeMaps
}
