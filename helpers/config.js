const dataConfig = {
   "caliente.pe": {
      defaultData: {
       s: "./data/subscribe/calientepe/subscribe1000.json",
       u: "./data/update/calientepe/1000.json"
     },
     1000: {
       s: "./data/subscribe/calientepe/subscribe1000.json",
       u: "./data/update/calientepe/1000.json"
     },
     2000: {
       s: "./data/subscribe/calientepe/subscribe1000.json",
       u: "./data/update/calientepe/2000.json"
     }
  },
  wplayco: {
    defaultData: {
      s: "./data/subscribe/wplayco/subscribe.json",
      u: "./data/update/wplayco/default.json"
    }
  },
  betcaliente: { 
    defaultData: {
      s: "./data/subscribe/betcaliente/subscribe.json",
      u: "./data/update/betcaliente/default.json"
    },
    1001: {
      s: "./data/subscribe/betcaliente/subscribe1001.json",
      u: "./data/update/betcaliente/1001.json"
    },
    2000: {
      s: "./data/subscribe/betcaliente/subscribe1001.json",
      u: "./data/update/betcaliente/2000.json"
    }
  }
};

const getGlobalConfigByCasinoName = (casino) => {
    return dataConfig[casino];
};

module.exports = { getGlobalConfigByCasinoName };
