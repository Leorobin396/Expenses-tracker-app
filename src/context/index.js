// In GlobalState.js
import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    type: "income",
    amount: 0,
    description: "",
    date: "",
    category: "Food"
  });

  const [value, setValue] = useState("income");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode

  function handleFormSubmit(currentFormData) {
    if (!currentFormData.description || !currentFormData.amount || !currentFormData.date) return;

    const newTransaction = { ...currentFormData, id: Date.now() };

    setAllTransactions([...allTransactions, newTransaction]);

    if (currentFormData.type === "income") {
      setTotalIncome((prevTotalIncome) => prevTotalIncome + parseFloat(currentFormData.amount));
    } else if (currentFormData.type === "expense") {
      setTotalExpense((prevTotalExpense) => prevTotalExpense + parseFloat(currentFormData.amount));
    }
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode); // Toggle dark mode state
  }

  console.log(allTransactions);

  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        totalExpense,
        setTotalExpense,
        totalIncome,
        setTotalIncome,
        value,
        setValue,
        allTransactions,
        setAllTransactions,
        handleFormSubmit,
        isDarkMode,  // Provide dark mode state
        toggleDarkMode  // Provide toggle function
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
