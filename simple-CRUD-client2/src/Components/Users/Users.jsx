import React from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
  const users = useLoaderData();
  console.log(users);
  const handleDelete = (_id) => {
    console.log("delete", _id);
    fetch(`http://localhost:3000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount === 1) {
          console.log("Successfully deleted one document.");
        } else {
          console.log("No documents matched the query. Deleted 0 documents.");
        }
      });
  };
  return (
    <div>
      <h2>All users in here:{users.length}</h2>
      <div className="bg-slate-400 font-bold">
        {users.map((user) => (
          <li className="font-bold" key={user._id}>
            Name:{user.name},Email:{user.email},ID:{user._id}
            <button onClick={() => handleDelete(user._id)}>X</button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Users;
