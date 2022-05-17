import { useEffect, useState } from "react"
import { isEmpty } from "lodash";

import { LoginPage, DashboardPage } from './pages';
import { ModalContainer, Header } from "./components"
import { useAppInit } from "./hooks";

import './App.css';


function App() {
  const [activeModal, setActiveModal] = useState("");
  const [user, setUser] = useState({});
  const { connectionLoading, connected, updatedUser } = useAppInit();
  const isLoading = connectionLoading || !connected;

  useEffect(() => {
    if (!isEmpty(updatedUser)) {
      setUser(updatedUser);
    };
  }, [updatedUser]);


  if (isLoading) {
    return  <div>Loading</div>
  }

  return (
    <div className="App">
      <Header balance={user.balance} username={user.username} />
      {isEmpty(user) ? (
        <LoginPage handleLogin={setUser} />
      ) : ( 
        <DashboardPage setActiveModal={setActiveModal}/>
      )}
      <ModalContainer showModal={activeModal} closeModal={() => setActiveModal("")} />
    </div>
  );
}

export default App;
