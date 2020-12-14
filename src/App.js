import "./App.css";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleSignUpSubmit = (formValues) => {
    console.log(formValues);
    setCurrentUser({
      firstName: "Jake",
      lastName: "Nudelman",
      email: "jakenudels@gmail.com",
      phone: "0537915663",
    });
  };

  const handleSignInSubmit = (formValues) => {
    console.log(formValues);
    setCurrentUser({
      firstName: "Jake",
      lastName: "Nudelman",
      email: "jakenudels@gmail.com",
      phone: "0537915663",
    });
  };
  return (
    <div className="App">
      {currentUser ? <WelcomePage />
      : 
      <HomePage
        handleSignUpSubmit={(values) => {
          handleSignUpSubmit(values);
        }}
        handleSignInSubmit={(values) => {
          handleSignInSubmit(values);
        }}
      />
    }
    </div>
  );
}

export default App;
