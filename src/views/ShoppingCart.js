import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  editarSeguimientoProducto,
  eliminarProductoDelCarrito,
  verCarrito,
} from "../helpers/api";

import background from "../img/background.jpg";

export const ShoppingCart = () => {
  const [carrito, setCarrito] = useState([]);
  const sesion = useSelector((store) => store.sesion.array);

  useEffect(() => {
    (async () => {
      setCarrito(await verCarrito());
    })();
  }, []);

  const eliminarProducto = (id) => {
    let datos = {};
    for (const key in carrito) {
      if (Object.hasOwnProperty.call(carrito, key)) {
        const element = carrito[key];
        if (key !== id) {
          datos = { ...datos, [key]: element };
        }
      }
    }

    setCarrito(datos);
    eliminarProductoDelCarrito(datos);
  };

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
                className="object-cover w-full h-56 mx-auto rounded-tr-md rounded-tl-3xl"
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
              {element.comprado !== false ? (
                <p className="p-3 font-semibold text-white bg-blue-500">
                  Seguimiento: {element.estado}
                </p>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      let datos = { ...element, comprado: true };
                      editarSeguimientoProducto(key, datos);
                      message.success("Compra realizada con exito");
                      setCarrito({ ...carrito, [key]: datos });
                    }}
                    type="primary"
                    size="large"
                  >
                    Comprar
                  </Button>
                  <Button
                    onClick={() => {
                      eliminarProducto(key);
                    }}
                    type="primary"
                    size="large"
                    danger
                  >
                    Eliminar
                  </Button>
                </>
              )}
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
