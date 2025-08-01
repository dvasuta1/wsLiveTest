const fs = require("fs");
const { getGlobalConfigByCasinoName } = require("./config");

function loadJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    return null;
  }
}

function getConfig(dataSetKey, context) {
  const config = getGlobalConfigByCasinoName(context);
  if (!config) {
    console.warn(`No config found for context: '${context}'`);
    return null;
  }
  return config[dataSetKey] || config.defaultData || null;
}

function getDataSetJSON(dataSetKey, context, type) {
  const conf = getConfig(dataSetKey, context);
  if (!conf || !conf[type]) {
    console.warn(`No configuration for key: '${dataSetKey}', context: '${context}', type: '${type}'`);
    return null;
  }
  return loadJsonFile(conf[type]);
}

module.exports = {
  loadJsonFile,
  getSubscribingDataSetJSON: (key, ctx) => getDataSetJSON(key, ctx, 's'),
  getUpdatingDataSetJSON: (key, ctx) => getDataSetJSON(key, ctx, 'u'),
};
