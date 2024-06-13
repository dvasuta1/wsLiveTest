const subscribeResponceMessage = require("../data/subscribe/subscribeResponce.js");

const addSubsAndCorrelationProps = (data, correlationId, subscriptionId) => {
  let subscribeResponceMessageClone = JSON.parse(JSON.stringify(data));
  subscribeResponceMessageClone.correlationId = correlationId;
  subscribeResponceMessageClone.subscribeResponse.subscriptionId = subscriptionId;
  return subscribeResponceMessageClone;
};

const updateSubscription = (correlationId, subscriptionId) => {
  return addSubsAndCorrelationProps(subscribeResponceMessage, correlationId, subscriptionId);
};

module.exports = { updateSubscription };
