import React, { useState } from "react";

export const Login = ({ loading, onLogin }) => {

  const [login, setLogin] = useState("");
  const handleChange = (e) => {
    setLogin(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(login);
  }

  return (
    <div className="loginPage">
      {loading ?
        <div>Loading</div> : (
        <>
          <h1>Login</h1>
          <form className="loginForm" onSubmit={handleSubmit}>
            <input required value={login} onChange={handleChange} type="text" />
            <button>Go</button>
          </form>
        </>
      )}
    </div>
  );
}
