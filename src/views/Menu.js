import React, { memo, useEffect, useState } from "react";
import { CardProduct } from "../components/CardProduct";
import { verProductosPublicos } from "../helpers/api";

import background from "../img/background.jpg";

export const Menu = memo(() => {
  const [productos, setProductos] = useState([]);
  const [buscarProducto, setBuscarProducto] = useState("--buscar--");
  useEffect(() => {
    (async () => {
      setProductos(await verProductosPublicos());
    })();
  }, []);

  const mostrarProductos = () => {
    let fragmento = [];
    for (const key in productos) {
      if (Object.hasOwnProperty.call(productos, key)) {
        const {
          nombreProducto,
          image,
          descripcion,
          cantidadStock,
          pesoProducto,
          vendedor,
        } = productos[key];
        if (buscarProducto === "--buscar--") {
          fragmento.push(
            <CardProduct
              key={key}
              image={image}
              nomProducto={nombreProducto}
              descripcion={descripcion}
              cantidadStock={cantidadStock}
              pesoProducto={pesoProducto}
              vendedor={vendedor}
            />
          );
        } else {
          if (nombreProducto === buscarProducto) {
            fragmento.push(
              <CardProduct
                key={key}
                image={image}
                nomProducto={nombreProducto}
                descripcion={descripcion}
                cantidadStock={cantidadStock}
                pesoProducto={pesoProducto}
                vendedor={vendedor}
              />
            );
          }
        }
      }
    }
    return fragmento;
  };

  const optionProductos = () => {
    let fragmento = [];
    for (const key in productos) {
      if (Object.hasOwnProperty.call(productos, key)) {
        const element = productos[key];
        fragmento.push(
          <option value={element.nombreProducto} key={key}>
            {element.nombreProducto}
          </option>
        );
      }
    }
    return fragmento;
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-10/12 pt-3 mx-auto sm:w-1/2 ">
        <select
          className="w-full p-3 mb-2 text-gray-600 bg-white border rounded-md focus:outline-none"
          onChange={(e) => {
            setBuscarProducto(e.target.value);
          }}
        >
          <option value={null}>--buscar--</option>
          {optionProductos()}
        </select>
      </div>
      <div className="grid grid-cols-4 gap-4 pt-3 mx-2 mb-11">
        {mostrarProductos()}
      </div>
      <br />
    </div>
  );
});
