export const PAGES = {
  LOGIN: "login",
  DASHBOARD: "dashboard",
  CREATE_USER: "create_user",
  CREATE_TOKEN: "create_token",
};

export const TOKENOMIC = {
  INIT_VALUE: 10000,
  CREATE_USER: 1000,
  CREATE_TOKEN: 500,
  FEE_CREATE_USER: 50,
  FEE_CREATE_TOKEN: 25,
};

export const TABS = {
  OWN: "own",
  MARKET: "market",
}

export const ENTITY_TYPES = {
  TOKEN: "token",
  USER: "user",
}

export const MODALS = {
  CREATE_TOKEN: "createToken",
  CREATE_USER: "createUser",
}

// That's looks like black security hole t_T
export const ADMIN_KEYS = {
  PUBLIC: "031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f",
  PRIVATE: "0101010101010101010101010101010101010101010101010101010101010101"
}

export const NODE_CONNECTION = {
  URL: "https://rellide-staging.chromia.dev/node/14768/",
  RID: "19C192F62A376F98DD50B420EBA602EC95D44514D0B5ECAA273278CD634028F0",
}

export const CREATE_USER_MODAL_DEFAULT_STATE = {
  username: "",
  shareTokens: 10,
  publicKey: "",
  privateKey: "",
};
