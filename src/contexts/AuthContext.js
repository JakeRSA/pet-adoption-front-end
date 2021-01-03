import React from "react";

const AuthContext = React.createContext({
  headers: {
    authorization: "",
    user_email: "",
  },
});

export default AuthContext;
