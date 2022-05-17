import { useEffect, useState } from "react"
import { isEmpty } from "lodash";

import { LoginPage, DashboardPage } from './pages';
import { ModalContainer, Header } from "./components"
import { MODALS } from "./constants";
import { useAppInit, useAuth } from "./hooks";

import './App.css';


function App() {
  const [showModal, setShowModal] = useState("");
  const [user, setUser] = useState({});
  const { connectionLoading, connected, updatedUser } = useAppInit();
  useEffect(() => {
    if (!isEmpty(updatedUser)) {
      setUser(updatedUser);
    };
  }, [updatedUser]);

  const { auth, authLoading } = useAuth();

  const handleLogin = async (privateKey) => {
    const result = await auth(privateKey);
    setUser(result);
  }

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    window.location.reload(false);
  }
  
  return (
    <div className="App">
      { connectionLoading || !connected ? <div>Loading</div> : (
        <>
          <Header balance={user.balance} username={user.username} onLogout={handleLogout} />
          {
            !isEmpty(user) ? (
              <>
                <DashboardPage showModal={setShowModal}/>
                <ModalContainer showModal={showModal} closeModal={() => setShowModal("")} />
              </>
            ) : <LoginPage loading={authLoading} onLogin={handleLogin} />
          }
        </>
      )}
    </div>
  );
}

export default App;
