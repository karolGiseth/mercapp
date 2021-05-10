import React from "react";

import background from "../img/background.jpg";

export const ShoppingCart = () => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2>Carrito de compras</h2>
    </div>
  );
};
