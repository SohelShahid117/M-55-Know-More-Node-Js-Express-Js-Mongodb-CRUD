import "./App.css";

function App() {
  const handleAddUser = (e) => {
    e.preventDefault();
    console.log("add user is working");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(form, user);
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    form.reset();
  };
  return (
    <>
      <h1>Simple CRUD</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder="name" />
        <br /> <br />
        <input type="email" name="email" id="" placeholder="email" />
        <br /> <br />
        <input type="submit" name="" id="" value="add User" />
      </form>
    </>
  );
}

export default App;
