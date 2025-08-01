const { getSubscribingDataSetJSON } = require("./fileLoad");

const addSubsAndCorrelationProps = (data, correlationId, subscriptionId) => ({
  ...data,
  correlationId,
  subscribeResponse: {
    ...data.subscribeResponse,
    subscriptionId,
  },
});

const updateSubscription = (correlationId, subscriptionId, dataset, context) => {
  const subscribeResponceMessage = getSubscribingDataSetJSON(dataset, context);
  return addSubsAndCorrelationProps(subscribeResponceMessage, correlationId, subscriptionId);
};

module.exports = { updateSubscription };
