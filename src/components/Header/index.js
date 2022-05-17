import "./Header.css"

export const Header = ({ balance, username, onLogout }) => (
  <div className="header">
    <div className="logo">NFT MARKET</div>
    <div className="user">
      {username ? `Hi ${username}, your balance: ${balance} coins` : "Please Login"}
      {username && <div className="logoutButton" onClick={onLogout}>Logout</div>}
    </div>
  </div>
)