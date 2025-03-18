const dataSetMap = {
  defaultData: "./data/update/default.json",
  1000: "./data/update/1000.json",
  2000: "./data/update/2000.json",
  test: "./data/update/test.json",
  spinawin: "./data/update/spinawin.json",
};

const dataConfig = {
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
      banner1: "./data/update/betcaliente/banner1.json",
      banner2: "./data/update/betcaliente/banner2.json",
      banner3: "./data/update/betcaliente/banner3.json",
      banner4: "./data/update/betcaliente/banner4.json",
      bannerUnavailable: "./data/update/betcaliente/bannerUnavailable.json",
      abjl_allbetsblackjack: "./data/update/betcaliente/abjl_allbetsblackjack.json",
      1000: "./data/update/betcaliente/1000.json",
      2000: "./data/update/betcaliente/2000.json",
      500: "./data/update/betcaliente/500.json",
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
