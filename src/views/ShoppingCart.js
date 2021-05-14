import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { verCarrito } from "../helpers/api";

import background from "../img/background.jpg";

export const ShoppingCart = () => {
  const [carrito, setCarrito] = useState([]);
  const sesion = useSelector((store) => store.sesion.array);

  useEffect(() => {
    (async () => {
      setCarrito(await verCarrito());
    })();
  }, []);

  const cartProduct = () => {
    let fragment = [];
    for (const key in carrito) {
      if (Object.hasOwnProperty.call(carrito, key)) {
        const element = carrito[key];
        if (element.correoComprador === sesion.correo) {
          fragment.push(
            <div
              key={key}
              className="col-span-4 pb-2 m-5 text-center duration-100 border border-blue-500 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm sm:transform hover:scale-105 hover:shadow-2xl rounded-tl-3xl sm:col-span-2 md:col-span-1"
            >
              <img
                className="mx-auto rounded-tr-md rounded-tl-3xl "
                src={element.image}
                alt={element.nomProducto}
              />
              <h2 className="text-2xl text-center">{element.nomProducto}</h2>
              <p>{element.descripcion}</p>
              <p>Precio: {element.precio}</p>
              <p>Vendedor: {element.vendedor}</p>
              <p>Email del vendedor: {element.correoVendedor}</p>
              <p>
                Cantidad: {element.cantidadStock} {element.pesoProducto}
              </p>
              <p className="p-3 font-semibold text-white bg-blue-500">
                Seguimiento: {element.estado}
              </p>
            </div>
          );
        }
      }
    }
    return fragment;
  };

  return (
    <div
      className="min-h-screen pt-5"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="text-4xl text-center">Mis compras</h2>
      <div className="grid grid-cols-4 sm:px-10">{cartProduct()}</div>
      <br />
      <br />
      <br />
    </div>
  );
};
