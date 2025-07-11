const dataSetMap = {
  defaultData: "./data/update/default.json",
  1000: "./data/update/1000.json",
  2000: "./data/update/2000.json",
  test: "./data/update/test.json",
  spinawin: "./data/update/spinawin.json",
};

const dataConfig = {
  "caliente.pe": {
    subscribe: "./data/subscribe/calientepe/subscribe1000.json",
    update: {
      defaultData: "./data/update/calientepe/default.json",
      videoBanners: "./data/update/calientepe/videoBanners.json",
      bannerUnavailable: "./data/update/calientepe/bannerUnavailable.json",
      abjl_allbetsblackjack: "./data/update/calientepe/abjl_allbetsblackjack.json",
      1000: "./data/update/calientepe/1000.json",
      2000: "./data/update/calientepe/2000.json",
      500: "./data/update/calientepe/500.json",
      closed_and_scheduled: "./data/update/calientepe/closed_and_scheduled.json",
      baccara: "./data/update/calientepe/baccara.json",
    },
  },
  europa: {
    subscribe: "./data/subscribe/europa/subscribe.json",
    update: {
      defaultData: "./data/update/europa/default.json",
      1000: "./data/update/europa/1000.json",
      2000: "./data/update/europa/2000.json",
      test: "./data/update/europa/test.json",
      spinawin: "./data/update/europa/spinawin.json",
    },
  },
  wplayco: {
    subscribe: "./data/subscribe/wplayco/subscribe.json",
    update: {
      defaultData: "./data/update/wplayco/default.json",
      videoBanners: "./data/update/wplayco/videoBanners.json",
      banner1: "./data/update/wplayco/banner1.json",
      banner2: "./data/update/wplayco/banner2.json",
      banner3: "./data/update/wplayco/banner3.json",
      banner4: "./data/update/wplayco/banner4.json",
      bannerUnavailable: "./data/update/wplayco/bannerUnavailable.json",
    },
  },
  betcaliente: {
    subscribe: "./data/subscribe/betcaliente/subscribe.json",
    update: {
      defaultData: "./data/update/betcaliente/default.json",
      videoBanners: "./data/update/betcaliente/videoBanners.json",
      bannerUnavailable: "./data/update/betcaliente/bannerUnavailable.json",
      abjl_allbetsblackjack: "./data/update/betcaliente/abjl_allbetsblackjack.json",
      1000: "./data/update/betcaliente/1000.json",
      2000: "./data/update/betcaliente/2000.json",
      500: "./data/update/betcaliente/500.json",
      closed_and_scheduled: "./data/update/betcaliente/closed_and_scheduled.json",
      baccara: "./data/update/betcaliente/baccara.json",
    },
  },
};

const getGlobalConfigByCasinoName = (casino) => {
  if (dataConfig[casino]) {
    return dataConfig[casino];
  } else {
    return dataConfig.europa;
  }
};

module.exports = { dataSetMap, getGlobalConfigByCasinoName };
