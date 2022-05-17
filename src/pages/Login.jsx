import React, { useState } from "react";

import { useAuth } from "../hooks";

export const Login = ({ handleLogin }) => {
  const [privateKey, setPivateKey] = useState("");
  const { auth, authLoading } = useAuth();
  
  const handleChange = (e) => {
    setPivateKey(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authorizedUser = await auth(privateKey);
    handleLogin(authorizedUser);
  }

  if (authLoading) {
    return (<div>Loading</div>);
  }

  return (
    <div className="loginPage">
      <h1>Login</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <input required value={privateKey} onChange={handleChange} type="text" />
        <button>Go</button>
      </form>
    </div>
  );
}
