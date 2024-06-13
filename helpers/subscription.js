const subscribeResponceMessage = require("../data/subscribe/subscribe.json");

const addSubsAndCorrelationProps = (data, correlationId, subscriptionId) => {
  data.correlationId = correlationId;
  data.subscribeResponse.subscriptionId = subscriptionId;
  return data;
};

const updateSubscription = (correlationId, subscriptionId) => {
  return addSubsAndCorrelationProps(subscribeResponceMessage, correlationId, subscriptionId);
};

module.exports = { updateSubscription };
