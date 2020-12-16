import "./App.css";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import ProfilePage from "./components/ProfilePage";
import Modal from "react-modal";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

Modal.setAppElement("#root");

function App() {
  const [currentUser, setCurrentUser] = useState({
    firstName: "Jake",
    lastName: "Nudelman",
    email: "jakenudels@gmail.com",
    phone: "0537915663",
  });

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

  const handleLogOut = () => {
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {currentUser ? (
              <WelcomePage
                currentUser={currentUser}
                handleLogOut={() => {
                  handleLogOut();
                }}
              />
            ) : (
              <HomePage
                handleSignUpSubmit={(values) => {
                  handleSignUpSubmit(values);
                }}
                handleSignInSubmit={(values) => {
                  handleSignInSubmit(values);
                }}
              />
            )}
          </Route>
          <Route path="/profile">
            <ProfilePage currentUser={currentUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
