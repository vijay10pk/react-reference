import { useState } from "react";
import Result from "./Components/Result";
import UserInput from "./Components/UserInput";
import Header from "./Components/header";
function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = userInput.duration >= 1;

  function handleUserInputChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }
  return (
    <>
      <Header/>
      <UserInput userInput= {userInput} onChange={handleUserInputChange} />
      {!inputIsValid && <p className="center">Please input a duration greater than zero.</p>}
      {inputIsValid && <Result input={userInput}/>}
    </>
  );
}

export default App;
