import pcl from 'postchain-client';


import { ADMIN_KEYS, NODE_CONNECTION } from '../constants';

class RellConnector {
  context = {};
  async connect() {
    try {
      const adminPubkey = Buffer.from(
        ADMIN_KEYS.PUBLIC,
        'hex'
      );
      const adminPrivkey = Buffer.from(
        ADMIN_KEYS.PRIVATE,
        'hex'
      );
      const nodeApiUrl = NODE_CONNECTION.URL;
      const blockchainRID = NODE_CONNECTION.RID;
      const rest = pcl.restClient.createRestClient(nodeApiUrl, blockchainRID, 5)
      this.context = pcl.gtxClient.createClient(
        rest,
        Buffer.from(
          blockchainRID,
          'hex'
        ),
        []
      );
      const result = await this.context.query('get_user_by_username', { username: 'admin' });
      if (!result) {
        const request = this.context.newTransaction([adminPubkey]);
        request.addOperation('init', adminPubkey);
        request.sign(adminPrivkey, adminPubkey);
        await request.postAndWaitConfirmation();
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async auth(privateKeyString) {
    try {
      const privateKey = Buffer.from(privateKeyString, 'hex');
      const publicKey = pcl.util.createPublicKey(privateKey);
      const { id, username } = await this.context.query("get_user", { pubkey: publicKey.toString('hex') });
      const balance = await this.context.query("get_balance", { pubkey: publicKey.toString('hex') })

      return {
        id,
        username,
        publicKey,
        privateKey,
        balance
      };
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async createUser({ publicKey, privateKey, invitedUserPublicKey, username, tokenToGive }) {
    const request = this.context.newTransaction([publicKey]);
    request.addOperation("register_user", publicKey.toString('hex'), invitedUserPublicKey, username, parseInt(tokenToGive));
    request.sign(privateKey, publicKey);
    return request.postAndWaitConfirmation();
  }

  async createToken({ publicKey, price, name, src, privateKey }) {
    const request = this.context.newTransaction([publicKey]);
    request.addOperation("create_token", publicKey.toString('hex'), parseInt(price), name, src);
    request.sign(privateKey, publicKey);
    return request.postAndWaitConfirmation();
  }

  async buyToken({ name, privateKey, publicKey }) {
    const request = this.context.newTransaction([publicKey]);
    request.addOperation("buy_token", publicKey.toString('hex'), name);
    request.sign(privateKey, publicKey);
    return request.postAndWaitConfirmation();
  }

  async getBalance(publicKey) {
    return this.context.query("get_balance", {
      pubkey:  Buffer.from(publicKey).toString('hex'),
    })
  }

  async getOwnTokens(publicKey) {
    return this.context.query("get_tokens", {
      pubkey: Buffer.from(publicKey).toString('hex'),
    });
  }

  async getTokensToBuy(publicKey) {
    return this.context.query("get_tokens_to_buy", {
      pubkey: Buffer.from(publicKey).toString('hex'),
    });
  }

  async getUserByName(username) {
    return this.context.query("get_user_by_username", {
      username,
    });
  }

  async getTokenByName(name) {
    return this.context.query("get_token_by_name", {
      name,
    });
  }


}

export const rellConnector = new RellConnector();
