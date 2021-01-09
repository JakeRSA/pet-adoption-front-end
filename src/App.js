import "./App.css";
import Header from "./components/Header";
import SignUpModal from "./components/SignUpModal";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import ProfilePage from "./components/ProfilePage";
import SearchPage from "./components/SearchPage";
import PetPage from "./components/PetPage";
import MyPets from "./components/MyPets";
import PetEdit from "./components/PetEdit";
import ManageUsers from "./components/ManageUsers";
import Modal from "react-modal";
import ServerContext from "./contexts/ServerContext";
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllPets from "./components/AllPets";
import ViewUser from "./components/ViewUser";

Modal.setAppElement("#root");

function App() {
  const baseServerUrl = "https://le-compagnon-server.herokuapp.com";

  const [isNewUser, setIsNewUser] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authConfig, setAuthConfig] = useState({
    headers: {
      user_email: JSON.parse(localStorage.getItem("user_email")),
      authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });

  useEffect(() => {
    document.title = "Le Compagnon"
  }, [])

  useEffect(() => {
    getCurrentUserData(authConfig);
    setModalIsOpen(false);
  }, [authConfig]);

  const handleOpenModal = (formType) => {
    if (formType === "newUser") {
      setIsNewUser(true);
    } else setIsNewUser(false);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const getCurrentUserData = (config) => {
    axios.get(baseServerUrl + "/currentuser", config).then((res) => {
      setCurrentUser(res.data);
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <ServerContext.Provider value={baseServerUrl}>
      <AuthContext.Provider value={authConfig}>
        <div className="App">
          <Router>
            <Header
              isSignedIn={!!currentUser}
              onLogInClick={() => {
                handleOpenModal();
              }}
              onLogOutClick={() => {
                handleLogOut();
              }}
            />
            <SignUpModal
              isOpen={modalIsOpen}
              onCloseModal={handleCloseModal}
              isNewUser={isNewUser}
              setAuthConfig={(config) => {
                setAuthConfig(config);
              }}
            />
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
                    onOpenModal={(formType) => {
                      handleOpenModal(formType);
                    }}
                  />
                )}
              </Route>
              <Route path="/manage-users">
                <ManageUsers />
              </Route>
              <Route path="/user/:id">
                <ViewUser />
              </Route>
              <Route path="/all-pets">
                <AllPets />
              </Route>
              <Route path="/add-pet">
                <PetEdit />
              </Route>
              <Route path="/edit-pet/:id">
                <PetEdit />
              </Route>
              <Route path="/my-pets">
                <MyPets savedOrOwned="owned" />
              </Route>
              <Route path="/saved-pets">
                <MyPets savedOrOwned="saved" />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route path="/pet/:id">
                <PetPage />
              </Route>
              <Route path="/search">
                <SearchPage />
              </Route>
            </Switch>
          </Router>
        </div>
      </AuthContext.Provider>
    </ServerContext.Provider>
  );
}

export default App;
