import { useState, useEffect } from "react";

import { rellConnector } from "../services/api";

export const useAppInit = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const connectStatus = await rellConnector.connect();
        setConnected(connectStatus);
        const userLoginFromSession = JSON.parse(sessionStorage.getItem('currentUser')) || {};
        if (userLoginFromSession.privateKey && connectStatus) {
          const updatedUser = await rellConnector.auth(userLoginFromSession.privateKey);
          sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    connectionLoading: loading,
    connected,
    updatedUser: user,
  }
}


export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const auth = async (privateKey) => {
    try {
      setLoading(true);
      const userResult = await rellConnector.auth(privateKey);
      if (userResult) {
        sessionStorage.setItem("currentUser", JSON.stringify(userResult));
        return userResult;
      }
      console.error("User not found");
    } finally {
      setLoading(false);
    }
  };
  return {
    authLoading: loading,
    auth,
  }
};

export const useTokens = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getList = async (isOwn = false) => {
    try {
      setLoading(true);
      const user = JSON.parse(sessionStorage.getItem('currentUser')) || {};
      if (isOwn) {
        setList(await rellConnector.getOwnTokens(user.publicKey));
      } else {
        setList(await rellConnector.getTokensToBuy(user.publicKey));
      }
    } finally {
      setLoading(false);
    }
  }
  const buyToken = async (name) => {
    try {
      setLoading(true);
      const user = JSON.parse(sessionStorage.getItem('currentUser')) || {};
      const dataTokenBuy = {
        name,
        privateKey: Buffer.from(user.privateKey, "hex"),
        publicKey: Buffer.from(user.publicKey, "hex"),
      }
      await rellConnector.buyToken(dataTokenBuy);
    } finally {
      setLoading(false);
    }
  }
  return {
    list,
    loading,
    getList,
    buyToken,
  }
  
}

export const useAddToken = () => {
  const [loading, setLoading] = useState(false);
  const createToken = async ({ price, name, src }) => {
    try {
      setLoading(true);
      const tokenResult = await rellConnector.getTokenByName(name);
      if (Boolean(tokenResult)) {
        return alert("Token name should be uniq");
      }
      const { privateKey, publicKey } = JSON.parse(sessionStorage.getItem('currentUser')) || {};
      const dataTokenCreation = {
        publicKey: Buffer.from(publicKey, 'hex'),
        price,
        name,
        src,
        privateKey: Buffer.from(privateKey, 'hex'),
      }
      
      await rellConnector.createToken(dataTokenCreation);
    } finally {
      setLoading(false);
    }
  }
  return {
    createToken,
    loading,
  }
}

export const useAddUser = () => {
  const [loading, setLoading] = useState(false);
  const createUser = async ({ invitedUserPublicKey, username, tokenToGive }) => {
    try {
      setLoading(true);
      const userResult = await rellConnector.getUserByName(username);
      if (Boolean(userResult)) {
        return alert("User name should be uniq");
      }
      // fix key to buffer
      const { privateKey, publicKey } = JSON.parse(sessionStorage.getItem('currentUser')) || {};
      const dataUserCreation = {
        privateKey: Buffer.from(privateKey, 'hex'),
        publicKey: Buffer.from(publicKey, 'hex'),
        invitedUserPublicKey,
        username,
        tokenToGive,
      };

      return await rellConnector.createUser(dataUserCreation);
    } finally {
      setLoading(false);
    }
  }
  return {
    createUser,
    loading,
  }
}
