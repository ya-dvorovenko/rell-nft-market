import React, { useEffect, useState } from "react";
import { TABS, MODALS } from "../constants";
import { useTokens } from "../hooks";
import { AddButton, TokenItem } from "../components";

export const Dashboard = ({ setActiveModal }) => {
  const [activeTab, setActiveTab] = useState(TABS.OWN);
  const { list, loading, getList } = useTokens();

  useEffect(() => {
    (async () => {
      await getList(activeTab === TABS.OWN);
    })()
  }, [activeTab]);

  
  if (loading) {
    return <div>Loading</div>
  }

  return (
    <div className="dashboardPage">
      <h1>Dashboard</h1>
      <div className="tabs">
        <div onClick={() => setActiveTab(TABS.OWN)} className={activeTab === TABS.OWN ? "active item" : "item"}>Own Tokens</div>
        <div onClick={() => setActiveTab(TABS.MARKET)} className={activeTab === TABS.MARKET ? "active item" : "item"}>Market</div>
      </div>
      <div className="tokensList">
        {
          list.map(({ name, src, price }) => (
            <TokenItem name={name} src={src} price={price} showBuyButton={activeTab === TABS.MARKET} />
          ))
        }
      </div>
      <AddButton handleUserCreate={() => setActiveModal(MODALS.CREATE_USER)} handleTokenCreate={() => setActiveModal(MODALS.CREATE_TOKEN)} />
    </div>
)};
