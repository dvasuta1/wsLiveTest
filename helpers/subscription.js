//const subscribeResponceMessage = require("../data/subscribe/subscribeResponce.js");
const subscribeResponceMessage = require("../data/subscribe/subscribeResponce");

const addSubsAndCorrelationProps = (data, correlationId, subscriptionId) => {
  console.log("data addSubsAndCorrelationProps", typeof data);
  console.log("data subscriptionId", data.subscriptionId);

  //let subscribeResponceMessageClone = JSON.parse(JSON.stringify(data));
  data.correlationId = correlationId;
  data.subscribeResponse.subscriptionId = subscriptionId;
  return data;
};

const updateSubscription = (correlationId, subscriptionId) => {
  return addSubsAndCorrelationProps(subscribeResponceMessage, correlationId, subscriptionId);
};

module.exports = { updateSubscription };
