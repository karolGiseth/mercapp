import { Button, message, Steps } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  editarProductoPublicado,
  editarSeguimientoProducto,
  eliminarProductoDelCarrito,
  verCarrito,
  verProductosPublicos,
} from "../helpers/api";

import background from "../img/background.jpg";

export const ShoppingCart = () => {
  const [carrito, setCarrito] = useState([]);
  const sesion = useSelector((store) => store.sesion.array);
  const [agregadoCarrito, setAgregadoCarrito] = useState({
    comprado: 0,
    pendiente: 0,
    entregado: 0,
  });

  useEffect(() => {
    (async () => {
      setCarrito(await verCarrito());
    })();
  }, []);

  setTimeout(() => {
    let comprado = 0;
    let pendiente = 0;
    let entregado = 0;
    for (const key in carrito) {
      if (Object.hasOwnProperty.call(carrito, key)) {
        const element = carrito[key];
        if (element.correoComprador === sesion.correo) {
          typeof parseInt(element.precio) === "number" &&
            element.comprado !== false &&
            element.estado !== "Entregado" &&
            (comprado += parseInt(element.precio));
          typeof parseInt(element.precio) === "number" &&
            element.comprado === false &&
            element.estado !== "Entregado" &&
            (pendiente += parseInt(element.precio));

          typeof parseInt(element.precio) === "number" &&
            element.estado === "Entregado" &&
            (entregado += parseInt(element.precio));
        }
      }
    }
    setAgregadoCarrito({ comprado, pendiente, entregado });
  }, 1000);

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

  const { Step } = Steps;

  const cartProduct = () => {
    let fragment = [];
    for (const key in carrito) {
      if (Object.hasOwnProperty.call(carrito, key)) {
        const element = carrito[key];
        if (element.correoComprador === sesion.correo) {
          fragment.push(
            <div
              key={key}
              className="col-span-4 pb-2 m-5 overflow-hidden text-center duration-100 border border-blue-500 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm sm:transform hover:shadow-2xl rounded-tl-3xl sm:col-span-2 md:col-span-1"
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
              {element.comprado !== false && (
                <Steps
                  type="navigation"
                  className="flex flex-col"
                  current={
                    element.estado === "Pendiente de envío"
                      ? 0
                      : element.estado === "En camino"
                      ? 1
                      : 3
                  }
                  percent={60}
                  responsive={true}
                >
                  <Step title="Enviado" />
                  <Step title="En camino" />
                  <Step title="Entregado" />
                </Steps>
              )}
              <br />
              {element.comprado !== false ? (
                <p className="p-3 font-semibold text-white bg-blue-500">
                  <br />
                  Fecha de compra: {element.fecha}
                  <br />
                  Fecha de entrega:{" "}
                  {moment(element.fechaEntrega).format("YYYY-MM-DD") ===
                  "Fecha inválida"
                    ? "Pediente por definir"
                    : moment(element.fechaEntrega).format("YYYY-MM-DD")}
                </p>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      let datos = {
                        ...element,
                        comprado: true,
                        fecha: moment().format("YYYY-MM-DD"),
                        fechaEntrega: "Pendiente definir por el vendedor.",
                        transportadorAsignado: false,
                        transportadorAcepto: "Pendiente",
                        fechaRecogida: "Pendiente",
                      };
                      editarSeguimientoProducto(key, datos);
                      message.success("Compra realizada con exito");
                      setCarrito({ ...carrito, [key]: datos });
                      (async () => {
                        let x = await verProductosPublicos();
                        for (const a in x) {
                          if (Object.hasOwnProperty.call(x, a)) {
                            const p = x[a];
                            if (
                              p.correo === element.correoVendedor &&
                              p.nombreProducto === element.nomProducto
                            ) {
                              editarProductoPublicado(a, {
                                ...p,
                                cantidadStock: 0,
                              });
                            }
                          }
                        }
                      })();
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
      <div className="sticky z-50 p-3 mx-10 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/4 top-10">
        💰 <span className="text-xl font-semibold">Total carrito:</span>
        <br />
        Comprado: {agregadoCarrito.comprado}
        <br />
        Pendiente: {agregadoCarrito.pendiente}
        <br />
        Entregado: {agregadoCarrito.entregado}
      </div>
      <div className="grid grid-cols-4 sm:px-10">{cartProduct()}</div>
      <br />
      <br />
      <br />
    </div>
  );
};
