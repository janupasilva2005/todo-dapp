import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import { Config } from "../Config/config.js";

export const TodoContext = createContext();

/**
 * Ethereum object coming from metamask
 */
const { ethereum } = window;

/**
 * Get the ethereum contract
 */
const getSolidityContract = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      Config.ContractAddress,
      Config.Abi,
      signer
    );

    if (contract) return contract;
  } catch (error) {
    console.log(error);
  }
};

export const ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [todos, setTodos] = useState([]);

  /**
   * Check if metamask is installed
   */
  const checkIfWalletIsInstalled = () => {
    if (!ethereum) return alert("Please install metamask");
  };

  /**
   * Connect metamask
   */
  const connectWallet = async () => {
    checkIfWalletIsInstalled();

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts) setCurrentAccount(accounts[0]);

      /**
       * To load the todos
       */
      window.location.reload();
    } catch (error) {
      if (error) return alert("Metamask already connecting");
    }
  };

  /**
   * Get all the todos
   */
  const getAllTodos = async () => {
    checkIfWalletIsInstalled();

    try {
      const contract = await getSolidityContract();
      const todos = await contract.getTodos();

      const filtered = todos.map((todo) => {
        return {
          id: parseInt(todo.id.toString()),
          title: todo.title,
        };
      });

      setTodos(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Add a todo to the blockchain
   */
  const addTodoToBlockchain = async (title) => {
    checkIfWalletIsInstalled();

    try {
      const contract = await getSolidityContract();
      const receipt = await contract.addTodo(title, currentAccount);

      if (receipt)
        return alert("Todo will be added to the blockchain after a small time");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Check if the wallet is connected
   */
  const checkIfWalletIsConnected = async () => {
    checkIfWalletIsInstalled();

    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      if (accounts) setCurrentAccount(accounts[0]);
      getAllTodos();
    } catch (error) {
      if (error) return alert("Metamask already connecting");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TodoContext.Provider
      value={{ connectWallet, currentAccount, todos, addTodoToBlockchain }}
    >
      {children}
    </TodoContext.Provider>
  );
};
