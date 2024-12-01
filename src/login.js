import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    // Set initial error values to empty
    setUsernameError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === username) {
      setUsernameError("Please enter your username");
      return;
    }

    if (!/^[a-zA-Z0-9._-]{6,32}$/.test(username)) {
      setUsernameError("Please enter a valid username");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    logIn();
  };

  // Log in a user using email and password
  const logIn = () => {
    fetch("http://localhost:3080/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: username, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ("success" === r.message) {
          localStorage.setItem(
            "user",
            JSON.stringify({ email: username, token: r.token })
          );
          props.setLoggedIn(true);
          props.setEmail(username);
          navigate("/");
        } else {
          window.alert("Wrong email or password");
        }
      });
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
