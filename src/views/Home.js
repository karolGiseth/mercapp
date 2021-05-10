import React from "react";
import logo from "../img/logo.png";
import background from "../img/background.jpg";

export const Home = () => {
  return (
    <div
      className="flex h-screen overflow-scroll bg-green-50"
      style={{ backgroundImage: `url(${background})` }}
    >
      <img className="m-auto duration-200" src={logo} alt="logo mercapp" />
    </div>
  );
};
