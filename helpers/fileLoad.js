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
  const { u } = parseConfig(dataSetKey, context);
  console.log("Updates JSON data file in use:: ", u);
  return u;
};

const getUpdatingDataSetJSON = (dataSetKey, context) => {
  let fileName = getUpdatesJSON(dataSetKey, context);
  return fileName ? loadJsonFile(fileName) : null;
};

const getSubscribeJSON = (dataSetKey, context) => {
  const { s } = parseConfig(dataSetKey, context);
  console.log("Subscribe JSON data file in use:: ", s);
  return s;
};

const getSubscribingDataSetJSON = (dataSetKey, context) => {
  let fileName = getSubscribeJSON(dataSetKey, context);
  return fileName ? loadJsonFile(fileName) : null;
};

module.exports = { loadJsonFile, getSubscribingDataSetJSON, getUpdatingDataSetJSON };
