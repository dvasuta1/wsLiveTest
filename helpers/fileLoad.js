const fs = require("fs");
const { getGlobalConfigByCasinoName } = require("./config");

function loadJsonFile(resource) {
  try {
    const filePath = resource;
    const fileContent = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);
    return jsonData;
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    return null;
  }
}

const isEmpty = function(obj) => {
  return Object.keys(obj).length === 0;
}

const parseConfig = (dataSetKey, context) => {
  const config = getGlobalConfigByCasinoName(context);

  if (!config) {
    console.warn(`No config found for context: '${context}', returning empty object`);
    return {};
  }

  let datasetConfig = config[dataSetKey] || config.defaultData;

  if (!datasetConfig) {
    console.warn(`No dataset or defaultData found for key: '${dataSetKey}' in context: '${context}'.`);
    return {};
  }

  console.log(`Config for '${context}' and datasetKey '${dataSetKey}' has been found`);
  return datasetConfig;
};

const getUpdatesJSON = (dataSetKey, context) => {
  const config = getGlobalConfigByCasinoName(context);
  const data = config.update?.[dataSetKey] ? config.update?.[dataSetKey] : config.update?.defaultData;
  console.log("Updates JSON data file in use:: ", data);
  return data;
};

const getUpdatingDataSetJSON = (dataSetKey, context) => {
  let fileName = getUpdatesJSON(dataSetKey, context);
  return loadJsonFile(fileName);
};

const getSubscribeJSON = (context) => {
  const config = getGlobalConfigByCasinoName(context);
  const path = config.subscribe;
  console.log("Subscribe JSON data file in use:: ", path);
  return path;
};

const getSubscribingDataSetJSON = (context) => {
  let fileName = getSubscribeJSON(context);
  return loadJsonFile(fileName);
};

module.exports = { loadJsonFile, getSubscribingDataSetJSON, getUpdatingDataSetJSON };
