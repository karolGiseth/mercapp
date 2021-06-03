import React from "react";
import logo from "../img/logo.png";
import background from "../img/background.jpg";

export const Home = () => {
  return (
    <div
      className="grid grid-cols-3 h-screen overflow-scroll bg-green-50"
      style={{ backgroundImage: `url(${background})` }}
    >
      <img className="col-span-1 m-auto duration-200 " src={logo} alt="logo mercapp" />
      <div className="col-span-2 bg-blue-200 pt-6 md:p-8 text-center md:text-left space-y-4">Hola descripción
        <h2 className="text-lg text-center"> TITULO</h2>
      </div>
    </div>
  
  );
};
