const { getSubscribingDataSetJSON } = require("./fileLoad");

const addSubsAndCorrelationProps = (data, correlationId, subscriptionId) => {
  data.correlationId = correlationId;
  data.subscribeResponse.subscriptionId = subscriptionId;
  return data;
};

const updateSubscription = (correlationId, subscriptionId, context) => {
  const subscribeResponceMessage = getSubscribingDataSetJSON(context);
  return addSubsAndCorrelationProps(subscribeResponceMessage, correlationId, subscriptionId);
};

module.exports = { updateSubscription };
