import "./App.css";

function App() {
  const handleAddUser = (e) => {
    e.preventDefault();
    console.log("add user is working");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("users added successfully");
          form.reset();
        }
      });
  };
  return (
    <>
      <h1>Simple CRUD App</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="name" /> <br /> <br />
        <input type="email" name="email" placeholder="email" /> <br />
        <input type="submit" value="Add User" />
      </form>
    </>
  );
}

export default App;
