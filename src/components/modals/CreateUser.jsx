import React, { useEffect, useState } from "react";
import pcl from 'postchain-client';

import { useAddUser } from "../../hooks";
import { CREATE_USER_MODAL_DEFAULT_STATE } from "../../constants";

import "./Modals.css"

export const CreateUser = ({ closeModal }) => {
  
  const [user, setUser] = useState(CREATE_USER_MODAL_DEFAULT_STATE);

  useEffect(() => {
    const { pubKey, privKey } = pcl.util.makeKeyPair();
    setUser({
      ...user,
      publicKey: pubKey.toString("hex"),
      privateKey: privKey.toString("hex"),
    })
  }, []);

  const { loading, createUser } = useAddUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({
      invitedUserPublicKey: user.publicKey,
      username: user.username,
      tokenToGive: user.shareTokens,
    });
    closeModal();
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <div className="createUserModal modal">
      <form className="createForm" onSubmit={handleSubmit}>
        <div className="closeModal" onClick={closeModal}>X</div>
        <h2>Create User</h2>
        <div className="inputContainer">
          <label htmlFor="username">Username</label>
          <input id="username" onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" value={user.username} />
        </div>
        <div className="inputContainer">
          <label htmlFor="shareTokens">Tokens to share</label>
          <input id="shareTokens" onChange={(e) => setUser({ ...user, shareTokens: e.target.value })} type="number" value={user.shareTokens} />
        </div>
        <div className="inputContainer">
          <label htmlFor="privateKey">Private Key</label>
          <input id="privateKey" disabled value={user.privateKey} />
        </div>
        <div className="inputContainer">
          <label htmlFor="publicKey">Public Key</label>
          <input id="publicKey" disabled value={user.publicKey} />
        </div>
        <button className="modalSubmit" type="submit">
          OK
        </button>
      </form>
    
    </div>
  )}
