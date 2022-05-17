import { useState } from "react";

import './AddButton.css';

export const AddButton = ({ handleUserCreate, handleTokenCreate }) => {
  const [showEntitySelector, setShowEntitySelector] = useState(false);
  const handleShowEntitiesListClick = () => {
    setShowEntitySelector(!showEntitySelector);
  }

  const userCreateHandler = () => {
    handleUserCreate();
    setShowEntitySelector(false);
  }

  const userTokenHandler = () => {
    handleTokenCreate();
    setShowEntitySelector(false);
  }

  return (
    <div className="addEntity">
      <div className="button" onClick={handleShowEntitiesListClick}>+</div>
      {showEntitySelector && (
        <div className="selector">
          <div className="item" onClick={userCreateHandler}>User</div>
          <div className="item" onClick={userTokenHandler}>TOKEN</div>
        </div>
      )}
    </div>
  )
}