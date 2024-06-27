const { getUpdatingDataSetJSON } = require("./fileLoad");

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

const getTheRandomEntry = (data) => {
  let index = getRandomInt(data.length);
  console.log("----entry start----");
  console.log("index-random:: ", index);
  return data[index];
};

const getTheNormalEntry = (arr) => {
  let index = 0;
  return function () {
    if (index >= arr.length) {
      index = 0;
    }
    console.log("----entry start----");
    console.log("index-normal:: ", index);
    return arr[index++];
  };
};

const getFilteredDataSnapshot = (subscriptionId, dataSet, targetAlias, context) => {
  let data = getUpdatingDataSetJSON(dataSet, context);
  data = updateData(data, subscriptionId);
  if (targetAlias) {
    data = filterByLaunchAlias(data, targetAlias);
  }
  return data;
};

module.exports = { getFilteredDataSnapshot, getTheRandomEntry, getTheNormalEntry };
