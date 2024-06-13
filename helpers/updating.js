const defaultUpdatingData = require("../data/update/1000.json");

const updateData = (data, subscriptionId) => {
  return data.map((item) => {
    if (item.updateNotification.subscriptionId === "%SUBSCRIPTION_ID%") {
      return {
        ...item,
        updateNotification: {
          ...item.updateNotification,
          subscriptionId,
        },
      };
    }
    return item;
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

module.exports = { getOneUpdatingDataEntry };
