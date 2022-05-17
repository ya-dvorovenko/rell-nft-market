import { useTokens } from "../../hooks";

import "./TokenItem.css";

export const TokenItem = ({ name, src, price, showBuyButton }) => {

  const { buyToken } = useTokens();

  const handleBuyClick = async (name) => {
    await buyToken(name);
  }

  return (
    <div key={name} className="listItem">
      <img alt="" src={src} />
      <div className="name">Token name: {name}</div>
      <div className="price">Token price {price}</div>
      {showBuyButton && <button className="buyButton" onClick={() => handleBuyClick(name)}>Buy</button>}
    </div>
  )
}