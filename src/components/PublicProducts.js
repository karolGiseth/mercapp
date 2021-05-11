import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { verProductosPublicos } from "../helpers/api";

export const PublicProducts = () => {
  const [productos, setProductos] = useState([]);
  const sesion = useSelector((store) => store.sesion.array);

  useEffect(() => {
    (async () => {
      setProductos(await verProductosPublicos());
    })();
  }, []);

  const card = () => {
    let fragment = [];
    for (const key in productos) {
      if (Object.hasOwnProperty.call(productos, key)) {
        const element = productos[key];
        if (element.correo === sesion.correo) {
          fragment.push(
            <div
              className="col-span-4 pb-2 text-center duration-100 border border-blue-500 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm sm:transform hover:scale-105 hover:shadow-2xl rounded-tl-3xl sm:col-span-2 md:col-span-1"
              key={key}
            >
              <img
                className="mx-auto rounded-tr-md rounded-tl-3xl "
                src={element.image}
                alt={element.nombreProducto}
              />
              <h2 className="mb-2 text-xl">{element.nombreProducto}</h2>
              <p className="mb-2">{element.descripcion}</p>
              <p className="mb-2">
                Cantidad: {element.cantidadStock} {element.pesoProducto}
              </p>
              <Button type="primary">Editar</Button>
            </div>
          );
        }
      }
    }
    return fragment;
  };

  return <>{card()}</>;
};
