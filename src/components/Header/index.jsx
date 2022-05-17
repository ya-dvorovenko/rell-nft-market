import "./Header.css"

export const Header = ({ balance, username }) => {
  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    window.location.reload(false);
  }
  return (
    <div className="header">
      <div className="logo">NFT MARKET</div>
      <div className="user">
        {username ? `Hi ${username}, your balance: ${balance} coins` : "Please Login"}
        {username && <div className="logoutButton" onClick={handleLogout}>Logout</div>}
      </div>
    </div>
  )
}