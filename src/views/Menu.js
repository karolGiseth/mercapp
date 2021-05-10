import React, { useEffect, useState } from "react";
import { CardProduct } from "../components/CardProduct";
import { verProductosPublicos } from "../helpers/api";

import background from "../img/background.jpg";

export const Menu = () => {
  const [productos, setProductos] = useState([]);
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
    return fragmento;
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="grid grid-cols-4 gap-4 pt-3 mx-2 mb-11">
        {mostrarProductos()}
      </div>
      <br />
    </div>
  );
};
