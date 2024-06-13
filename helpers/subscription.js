//const subscribeResponceMessage = require("../data/subscribe/subscribeResponce.js");
const subscribeResponceMessage = require("../data/subscribe/subscribe.json");

const addSubsAndCorrelationProps = (data, correlationId, subscriptionId) => {
  //let subscribeResponceMessageClone = JSON.parse(JSON.stringify(data));
  data.correlationId = correlationId;
  data.subscribeResponse.subscriptionId = subscriptionId;
  console.log("data addSubsAndCorrelationProps", data);

  return data;
};

const updateSubscription = (correlationId, subscriptionId) => {
  return addSubsAndCorrelationProps(subscribeResponceMessage, correlationId, subscriptionId);
};

module.exports = { updateSubscription };
