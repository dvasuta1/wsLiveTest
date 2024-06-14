const defaultUpdatingData = require("../data/update/2000.json");
const dataSetMap = require("./config");

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

const getRandomEntry = (data, subscriptionId) => {
  const updatedData = updateData(data, subscriptionId);
  let index = getRandomInt(updatedData.length);
  console.log("index", index);
  return updatedData[index];
};

const getOneUpdatingDataEntry = (subscriptionId, dataSet, launchAlias) => {
  console.log("getOneUpdatingDataEntry", subscriptionId, dataSet, launchAlias);
  return getRandomEntry(defaultUpdatingData, subscriptionId);
};

function filterByLaunchAlias(dataInput, subscriptionId, targetAlias) {
  const data = updateData(dataInput, subscriptionId);
  const filteredNotifications = [];

  for (const item of data) {
    const updateNotification = item.updateNotification;
    if (updateNotification) {
      const updatedTables = updateNotification.updatedTables || [];
      for (const table of updatedTables) {
        if (table.launchAlias === targetAlias) {
          filteredNotifications.push(updateNotification);
          break; // No need to check other tables in this update notification
        }
      }
    }
  }

  return filteredNotifications;
}

const getDataSetJSON = (dataSetKey) => {
  return dataSetMap[dataSetKey] ? dataSetMap[dataSetKey] : dataSetMap["defaultData"];
};

const getFilteredGames = (subscriptionId, dataSet, targetAlias) => {
  const dataSource = require("../data/update/default.json");
  console.log("dataSource", dataSource);
  //const dataWithSubscriptionId = updateData(data, subscriptionId);
};

module.exports = { getOneUpdatingDataEntry, filterByLaunchAlias, getFilteredGames };
