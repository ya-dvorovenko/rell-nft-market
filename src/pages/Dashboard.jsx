import React, { useEffect, useState } from "react";

import { TABS, ENTITY_TYPES, MODALS } from "../constants";
import { useTokens } from "../hooks";
import { AddButton } from "../components";

export const Dashboard = ({ showModal }) => {
  const [activeTab, setActiveTab] = useState(TABS.OWN);

  const { list, loading, getList, buyToken } = useTokens();
  useEffect(() => {
    (async () => {
      await getList(activeTab === TABS.OWN);
    })()
  }, [activeTab]);

  useEffect(() => {
    // need to get list of tokens
  }, []);

  const handleBuyClick = async (name) => {
    await buyToken(name);
  }

  const handleTabClick = (tabname) => {
    setActiveTab(tabname);
  }

  const showUserModal = () => {
    showModal(MODALS.CREATE_USER);
  };

  const showTokenModal = () => {
    showModal(MODALS.CREATE_TOKEN);
  }

  return (
    <div className="dashboardPage">
      {loading ?
        (<div>Loading</div>) : (
        <>
        <h1>Dashboard</h1>
        <div className="tabs">
          <div onClick={() => handleTabClick(TABS.OWN)} className={activeTab === TABS.OWN ? "active item" : "item"}>Own Tokens</div>
          <div onClick={() => handleTabClick(TABS.MARKET)} className={activeTab === TABS.MARKET ? "active item" : "item"}>Market</div>
        </div>
        <div className="tokensList">
          {
            list.map(({ name, src, price }) => (
              <div key={name} className="listItem">
                <img alt="" src={src} />
                <div className="name">Token name: {name}</div>
                <div className="price">Token price {price}</div>
                {activeTab === TABS.MARKET && <button className="buyButton" onClick={() => handleBuyClick(name)}>Buy</button>}
              </div>
            ))
          }
        </div>
        <AddButton onUserCreate={showUserModal} onTokenCreate={showTokenModal} />
        </>
      )}
    </div>
)};
