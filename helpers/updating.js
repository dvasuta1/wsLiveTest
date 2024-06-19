const defaultData = require("../data/update/default.json");
const data1000 = require("../data/update/1000.json");
const data2000 = require("../data/update/2000.json");
const { dataSetMap } = require("./config");
const { loadJsonFile } = require("./fileLoad");

const updateData = (data, subscriptionId) => {
  return data.map((item) => {
    return {
      ...item,
      updateNotification: {
        ...item.updateNotification,
        subscriptionId,
      },
    };
  });
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

function filterByLaunchAlias(data, targetAlias) {
  //const data = updateData(dataInput, subscriptionId);
  const filteredNotifications = [];

  for (const item of data) {
    const updateNotification = item.updateNotification;
    if (updateNotification) {
      const updatedTables = updateNotification.updatedTables || [];
      for (const table of updatedTables) {
        if (table.launchAlias === targetAlias) {
          filteredNotifications.push({ updateNotification });
          break; // No need to check other tables in this update notification
        }
      }
    }
  }

  return filteredNotifications;
}

const getJSON = (dataSetKey) => {
  /*let data = dataSetMap.defaultData;
  if (dataSetMap[dataSetKey]) {
    data = dataSetMap[dataSetKey];
  }
  */
  const data = dataSetMap[dataSetKey] ? dataSetMap[dataSetKey] : dataSetMap.defaultData;
  console.log("getJSON data:: ", data);
  return data;
};

/*const getDataSetJSON = (dataSetKey) => {
  switch (dataSetKey) {
    case "1000":
      return data1000;
      break;
    case "2000":
      return data2000;
      break;
    default:
      return defaultData;
  }
};*/
const getDataSetJSON = (dataSetKey) => {
  let fileName = getJSON(dataSetKey);
  return loadJsonFile(fileName);
};

const getTheRandomEntry = (data) => {
  let index = getRandomInt(data.length);
  console.log("index-random:: ", index);
  return data[index];
};

const getTheNormalEntry = (arr) => {
  let index = 0;
  return function () {
    if (index >= arr.length) {
      index = 0;
    }
    console.log("index-normal:: ", index);
    return arr[index++];
  };
};

const getFilteredDataSnapshot = (subscriptionId, dataSet, targetAlias) => {
  let data = getDataSetJSON(dataSet);
  data = updateData(data, subscriptionId);
  if (targetAlias) {
    data = filterByLaunchAlias(data, targetAlias);
  }
  return data;
};

/*const getFilteredGames = (subscriptionId, dataSet, targetAlias, order) => {
  let data = getFilteredDataSnapshot(subscriptionId, dataSet, targetAlias);
  switch (order) {
    default:
      data = getTheRandomEntry(data);
  }
  return data;
};*/

const getFilteredData = (data, order) => {
  /*let getNextElement = getTheNormalEntry(data);*/
  /* switch (order) {
    case "normal":
      data = getNextElement(data);
    default:
      data = getTheRandomEntry(data);
  }*/
  return data;
};

module.exports = { getFilteredData, getFilteredDataSnapshot, getTheRandomEntry, getTheNormalEntry };
