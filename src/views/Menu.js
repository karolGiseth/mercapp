import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardProduct } from "../components/CardProduct";
import { verProductosPublicos } from "../helpers/api";

import background from "../img/background.jpg";

export const Menu = () => {
  const sesion = useSelector((store) => store.sesion.array);
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
          precio,
          correo,
          telefono,
          direccion,
        } = productos[key];
        if (cantidadStock > 0) {
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
                precio={precio}
                correoVendedor={correo}
                correoComprador={sesion.correo}
                direccion={sesion.direccion}
                comprador={sesion.nombre}
                telefonoVendedor={telefono}
                direccionVendedor={direccion}
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
                  correoVendedor={correo}
                  correoComprador={sesion.correo}
                  telefonoVendedor={telefono}
                  direccionVendedor={direccion}
                />
              );
            }
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
        const { nombreProducto } = productos[key];
        fragmento.push(
          <option value={nombreProducto} key={key}>
            {nombreProducto}
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
          className="w-full p-3 text-gray-600 bg-white rounded-md focus:outline-none"
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
};
