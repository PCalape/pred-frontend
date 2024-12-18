import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const { loggedIn, username } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? "Log out" : "Log in"}
        />
        {loggedIn ? <div>Your username is {username}</div> : <div />}
      </div>
    </div>
  );
};

export default Home;
