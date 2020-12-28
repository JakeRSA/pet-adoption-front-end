import React from "react";
import "../styles/ManageUsers.css";

function ManageUsers(props) {
  const users = [
    {
      id: 1,
      firstName: "Jake",
      lastName: "Nudelman",
      email: "jakenudels@gmail.com",
      phone: "0537915663",
      type: "admin",
    },
    {
      id: 2,
      firstName: "Nake",
      lastName: "Judelman",
      email: "nakejudels@gmail.com",
      phone: "0537915664",
      type: "admin",
    },
    {
      id: 3,
      firstName: "Ekaj",
      lastName: "Namledun",
      email: "sledunekajresgaerhaerhareh@gmail.com",
      phone: "0537915665",
      type: "member",
    },
    {
      id: 4,
      firstName: "Dog",
      lastName: "Boy",
      email: "dogboy@gmail.com",
      phone: "0537915665",
      type: "member",
    },
    {
      id: 5,
      firstName: "Cat",
      lastName: "Girl",
      email: "catgirl@gmail.com",
      phone: "0537915665",
      type: "member",
    },
  ];

  const userList = users.map((user) => (
    <li className="item" key={user.id}>
      <span>
        <p>{user.firstName + " " + user.lastName}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.type}</p>
      </span>
    </li>
  ));
  return (
    <div className="main-container">
      <h1>Manage Users</h1>
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
    </div>
  );
}

export default ManageUsers;
