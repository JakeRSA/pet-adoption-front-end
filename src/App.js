import "./App.css";
import Header from "./components/Header";
import SignUpModal from "./components/SignUpModal";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import ProfilePage from "./components/ProfilePage";
import SearchPage from "./components/SearchPage";
import PetPage from "./components/PetPage";
import PetEdit from "./components/PetEdit";
import ManageUsers from "./components/ManageUsers";
import Modal from "react-modal";
import ServerContext from "./contexts/ServerContext";
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyPets from "./components/MyPets";

Modal.setAppElement("#root");

function App() {
  const baseServerUrl = "http://localhost:5000";

  const [isNewUser, setIsNewUser] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authConfig, setauthConfig] = useState({
    headers: {
      user_email: JSON.parse(localStorage.getItem("user_email")),
      authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });

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

  const handleSignUpSubmit = (formValues) => {
    axios
      .post(baseServerUrl + "/signup", formValues, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("user_email", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
        setauthConfig({
          headers: {
            authorization: "Bearer " + res.data.accessToken,
            user_email: res.data.user,
          },
        });
        setModalIsOpen(false);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  const handleSignInSubmit = (formValues) => {
    axios
      .post(baseServerUrl + "/login", formValues, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("user_email", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
        setauthConfig({
          headers: {
            authorization: "Bearer " + res.data.accessToken,
            user_email: res.data.user,
          },
        });
      })
      .catch((e) => {
        console.log(e.response.data);
      });
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

  const animalTypesToOptions = async () => {
    const types = (await axios.get(baseServerUrl + "/types")).data;
    return types.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ));
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
              onSignUp={(values) => {
                handleSignUpSubmit(values);
              }}
              onSignIn={(values) => {
                handleSignInSubmit(values);
              }}
            />
            {/* <PetEdit
          animal={testAnimal}
          animalTypeOptions={animalTypesToOptions()}
          baseServerUrl={baseServerUrl}
          authConfig={authConfig}
        /> */}
            {/* <AdminDash /> */}
            {/* <SearchPage
            isAdvanced={false}
            animalTypesToOptions={animalTypesToOptions}
          /> */}

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
                    handleSignUpSubmit={(values) => {
                      handleSignUpSubmit(values);
                    }}
                    handleSignInSubmit={(values) => {
                      handleSignInSubmit(values);
                    }}
                  />
                )}
              </Route>
              <Route path="/manage-users">
                <ManageUsers />
              </Route>
              <Route path="/all-pets">
                {/* need to sort this out still */}
              </Route>
              <Route path="/my-pets">
                <MyPets savedOrOwned="owned" />
              </Route>
              <Route path="/saved-pets">
                <MyPets savedOrOwned="saved" />
              </Route>
              <Route path="/profile">
                <ProfilePage
                  currentUser={currentUser}
                  baseServerUrl={baseServerUrl}
                  authConfig={authConfig}
                />
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
