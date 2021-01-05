import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import ServerContext from "../contexts/ServerContext";
import "../styles/ManageUsers.css";

function ManageUsers() {
  const baseServerUrl = useContext(ServerContext);
  const authConfig = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await axios.get(baseServerUrl + "/user", authConfig);
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;
    getUsers();
    return () => {
      mounted = false;
    };
  }, []);

  let userList;
  if (!loading) {
    userList = users.map((user) => (
      <li className="item" key={user._id}>
        <span>
          <p>{user.firstName + " " + user.lastName}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.type}</p>
        </span>
      </li>
    ));
  }

  return (
    <div className="main-container">
      <h1>Manage Users</h1>
      {loading || (
        <ul className="user-list">
          <li className="list-headers">
            <span>
              <p>name</p>
              <p>email</p>
              <p>phone</p>
              <p>type</p>
            </span>
          </li>
          {userList}
        </ul>
      )}
    </div>
  );
}

export default ManageUsers;
