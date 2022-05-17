import { useState } from "react";

import './AddButton.css';

export const AddButton = ({ onUserCreate, onTokenCreate }) => {
  const [showEntitySelector, setShowEntitySelector] = useState(false);
  const handleShowEntitiesListClick = () => {
    setShowEntitySelector(!showEntitySelector);
  }

  const userCreateHandler = () => {
    onUserCreate();
    setShowEntitySelector(false);
  }

  const userTokenHandler = () => {
    onTokenCreate();
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