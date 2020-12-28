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
      email: "sledunekaj@gmail.com",
      phone: "0537915665",
      type: "member",
    },
  ];

  const userList = users.map((user) => <li key={user.id}>{user.firstName}</li>);
  return (
    <div>
      <ul>{userList}</ul>
    </div>
  );
}

export default ManageUsers;
