import "./App.css";
import Header from "./components/Header";
import SignUpModal from "./components/SignUpModal";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import ProfilePage from "./components/ProfilePage";
import SearchPage from "./components/SearchPage";
import Modal from "react-modal";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

Modal.setAppElement("#root");

function App() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    firstName: "Jake",
    lastName: "Nudelman",
    email: "jakenudels@gmail.com",
    phone: "0537915663",
  });

  const handleOpenModal = (formType) => {
    if (formType === "newUser") {
      setIsNewUser(true);
    } else setIsNewUser(false);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

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
        <SignUpModal
          isOpen={modalIsOpen}
          onCloseModal={handleCloseModal}
          isNewUser={isNewUser}
          onSignUp={(values) => {
            handleSignUpSubmit(values);
          }}
          onSignIn={(values) => {
            handleSignInSubmit(values);
          }}
        />
        <Header
          isSignedIn={!!currentUser}
          onLogInClick={() => {
            handleOpenModal();
          }}
          onLogOutClick={() => {
            handleLogOut();
          }}
        />
        <SearchPage isAdvanced={false} />
        {/* <Switch>
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
                onOpenModal={(formType) => {handleOpenModal(formType)}}
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
          <Route path="/search">
            <SearchPage />
          </Route>
        </Switch> */}
      </Router>
    </div>
  );
}

export default App;
