//const subscribeResponceMessage = require("../data/subscribe/subscribeResponce.js");
const subscribeResponceMessage = require("../data/subscribe/subscribeResponce");

const addSubsAndCorrelationProps = (data, correlationId, subscriptionId) => {
  console.log("data addSubsAndCorrelationProps", data);
  let subscribeResponceMessageClone = JSON.parse(JSON.stringify(data));
  subscribeResponceMessageClone.correlationId = correlationId;
  subscribeResponceMessageClone.subscribeResponse.subscriptionId = subscriptionId;
  return subscribeResponceMessageClone;
};

const updateSubscription = (correlationId, subscriptionId) => {
  return addSubsAndCorrelationProps(subscribeResponceMessage, correlationId, subscriptionId);
};

module.exports = { updateSubscription };
