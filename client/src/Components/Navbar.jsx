import { Logo } from "./Logo";
import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import { shortAccount } from "../Utils/short.js";

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(TodoContext);

  return (
    <div className="nav-container">
      <div className="nav-item logo">
        <Logo />
      </div>
      {currentAccount ? (
        <div className="nav-item account">
          Account: {shortAccount(currentAccount)}
        </div>
      ) : (
        <button className="connect-btn" onClick={connectWallet}>
          Connect wallet
        </button>
      )}
    </div>
  );
};

export { NavBar };
