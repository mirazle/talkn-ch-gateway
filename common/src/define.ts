const define: any = {
  APP_NAME: "talkn",
  PRODUCTION: "PRODUCTION",
  LOCALHOST: "LOCALHOST",
  DEVELOPMENT: "DEVELOPMENT",
  PRODUCTION_DOMAIN: "talkn.io",
  DEVELOPMENT_DOMAIN: "localhost",
  AWS_HOST_KEY: "compute.internal", //'ec2.internal',
  PORTS: {
    HTTP: 80,
    HTTPS: 443,
    DEVELOPMENT_COVER: 8000,
    DEVELOPMENT_API: 8001,
    DEVELOPMENT_COMPONENTS: 8002,
    DEVELOPMENT_TUNE: 8003,
    DEVELOPMENT_CLIENT: 8080,
    REDIS: 6379,
    MONGO: 27017,
    IO_LB: 10440,
    IO_ROOT: 10444,
  },
  SUB_DOMAINS: {
    WWW: "www",
    API: "api",
    DESC: "desc",
    PORTAL: "portal",
    CLIENT: "client",
    ASSETS: "assets",
    SESSION: "session",
    AUTO: "auto",
    OWN: "own",
    NEWS: "news",
    BANNER: "banner",
    COVER: "cover",
    RANK: "rank",
    EXT: "ext",
    COMPONENTS: "components",
    TUNE: "tune",
    TRANSACTION: "transaction",
    AUTH: "auth",
  },
  APP_TYPES: {
    CLIENT: "CLIENT",
    PORTAL: "PORTAL",
    EXTENSION: "EXTENSION",
    API: "API",
    COVER: "COVER",
    COMPONENTS: "COMPONENTS",
    TUNE: "TUNE",
  },
  URL: {
    twitter: "https://twitter.com/",
    facebook: "https://www.facebook.com/",
    appstore: "https://itunes.apple.com/app/id",
    playstore: "https://play.google.com/store/apps/details?id=",
    chromeExtension:
      "https://chrome.google.com/webstore/detail/talkn-for-chrome/dkngnmdlcofambpfaccepbnjgfholgbo?hl=en",
  },
  talknClientJs: "talkn.client.js",
  talknApiJs: "talkn.api.js",
  talknRankJs: "talkn.rank.js",
  noInnerNotif: "Sorry, No Function.",
  bannerClass: "talkn_banner",
  storageKey: {
    baseKey: "@talkn@",
    postsTimelineZero: "postsTimelineZero",
    postsTimeline: "postsTimeline",
    postsSingle: "postsSingle",
    postsMulti: "postsMulti",
    postsChild: "postsChild",
    postsLogs: "postsLogs",
    threads: "threads",
  },
};

export default define;
