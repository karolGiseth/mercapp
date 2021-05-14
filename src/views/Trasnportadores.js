import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { listarVehiculos } from "../helpers/api";
import { WhatsAppOutlined } from "@ant-design/icons";

import background from "../img/background.jpg";

export default function Trasnportadores() {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    (async () => {
      setVehiculos(await listarVehiculos());
    })();
  }, []);

  const cardVehiculo = () => {
    let fragmento = [];
    for (const key in vehiculos) {
      if (Object.hasOwnProperty.call(vehiculos, key)) {
        const element = vehiculos[key];
        fragmento.push(
          <div
            key={key}
            className="mb-3 text-center bg-white border rounded-lg shadow-md"
          >
            <h2 className="text-xl text-center">
              {element.tipoVehiculo} - {element.marca}
            </h2>
            <div className="grid grid-cols-2 text-center sm:grid-cols-4 ">
              <p>Cilindraje: {element.cilindraje}</p>
              <p>Color: {element.color}</p>
              <p>Modelo: {element.modelo}</p>
              <p>Placa: {element.placa}</p>
              <p>Propietario: {element.nombre}</p>
              <p>Dirección: {element.direccion}</p>
              <p>Telefono: {element.telefono}</p>
              <p>Correo: {element.correo}</p>
            </div>
            <Button
              target="_blank"
              href={`https://api.whatsapp.com/send?phone=57${element.telefono}`}
              className="mb-5"
              type="primary"
              size="large"
              shape="round"
              icon={<WhatsAppOutlined />}
            >
              Contactar
            </Button>
          </div>
        );
      }
    }
    return fragmento;
  };

  return (
    <div
      className="min-h-screen px-3 pt-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="text-4xl text-center">Transportadores</h2>
      {cardVehiculo()}
      <br />
      <br />
    </div>
  );
}
