import React, { useState } from "react";

import { useAddToken } from "../../hooks";

import "./Modals.css"

export const CreateToken = ({ closeModal }) => {
  const [token, setToken] = useState({
    name: "",
    price: 0,
    src: "",
  });
  const { loading, createToken } = useAddToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { price, name, src } = token;
    await createToken({
      price, name, src
    })
    closeModal();
  }

  return (
    <div className="createTokenModal modal">
      { loading ? <div>Loading</div> : (
        <form className="createForm" onSubmit={handleSubmit}>
          <div className="closeModal" onClick={closeModal}>X</div>
          <h2>Create Token</h2>
          <div className="inputContainer">
            <label htmlFor="name">Name</label>
            <input id="name" onChange={(e) => setToken({ ...token, name: e.target.value })} type="text" value={token.name} />
          </div>
          <div className="inputContainer">
            <label htmlFor="name">SRC</label>
            <input id="name" onChange={(e) => setToken({ ...token, src: e.target.value })} type="text" value={token.src} />
          </div>
          <div className="inputContainer">
            <label htmlFor="price">Price</label>
            <input id="price" onChange={(e) => setToken({ ...token, price: e.target.value })} type="number" value={token.price} />
          </div>
          {token.src && <img className="imagePreview" src={token.src} alt="imageUrl" />}
          <button className="modalSubmit" type="submit">
            OK
          </button>
        </form>
      )}
    </div>
  )}
