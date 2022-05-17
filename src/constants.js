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
  URL: "https://rellide-staging.chromia.dev/node/12898/",
  RID: "CB18725954109230D0DC320CC69375D3D99F65ED52BBF54486AC352F9A2766F5",
}

export const CREATE_USER_MODAL_DEFAULT_STATE = {
  username: "",
  shareTokens: 10,
  publicKey: "",
  privateKey: "",
};
