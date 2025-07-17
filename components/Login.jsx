import UserContext from "@/context/UserContext";
import React, { useContext, useState } from "react";

const Login = () => {
  const [username, setusername] = useState("");
  const [pass, setPass] = useState("");

  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" && pass !== "") {
      setUser({ username, pass });
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="user name"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Login;
