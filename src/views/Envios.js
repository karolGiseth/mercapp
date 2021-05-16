import { Button, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { editarSeguimientoProducto, verCarrito } from "../helpers/api";

import background from "../img/background.jpg";

export default function Envios() {
  const [envios, setEnvios] = useState([]);
  const sesion = useSelector((store) => store.sesion.array);

  useEffect(() => {
    (async () => {
      setEnvios(await verCarrito());
    })();
  }, []);

  return (
    <div
      className="min-h-screen pt-5"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="text-3xl text-center">Envios</h2>
      <div className="grid grid-cols-4">
        {(() => {
          let fragmento = [];
          for (const key in envios) {
            if (Object.hasOwnProperty.call(envios, key)) {
              const element = envios[key];
              if (sesion.correo === element.transportadorAsignado) {
                fragmento.push(
                  <div
                    key={key}
                    className="bg-white border rounded-md mx-2.5 p-2 col-span-4 sm:col-span-2 lg:col-span-1"
                  >
                    <h2 className="text-xl">Tiene una solicitud de envio</h2>
                    <p>Detalle:</p>
                    <p>
                      <span className="font-bold">Nombre del producto:</span>{" "}
                      {element.nomProducto}
                    </p>
                    <p>
                      <span className="font-bold">Cantidad:</span>{" "}
                      {element.cantidadStock} {element.pesoProducto}
                      {"(s)"}
                    </p>
                    <p>
                      <span className="font-bold">Fecha de entrega:</span>{" "}
                      {moment(element.fechaEntrega).format("YYYY-MM-DD")}
                    </p>
                    <p>
                      <span className="font-bold">Lugar de entrega:</span>{" "}
                      {element.direccion}
                    </p>
                    <p>
                      <span className="font-bold">Solicito el servicio:</span>{" "}
                      {element.vendedor}
                    </p>
                    <p>
                      <span className="font-bold">Correo del solicitante:</span>{" "}
                      {element.correoVendedor}
                    </p>
                    {element.transportadorAcepto === "Aceptado" && (
                      <span className="p-1 ml-3 text-xl border-b-4 border-blue-500 rounded-md">
                        Envio Aceptado
                      </span>
                    )}
                    {element.transportadorAcepto === "Pendiente" && (
                      <>
                        <Button
                          onClick={() => {
                            setEnvios({
                              ...envios,
                              [key]: {
                                ...element,
                                transportadorAcepto: "Aceptado",
                              },
                            });
                            message.success("Envio aceptado");
                            editarSeguimientoProducto(key, {
                              ...element,
                              transportadorAcepto: "Aceptado",
                            });
                          }}
                          className="mx-1"
                          type="primary"
                        >
                          Aceptar
                        </Button>
                        <Button
                          onClick={() => {
                            setEnvios({
                              ...envios,
                              [key]: {
                                ...element,
                                transportadorAsignado: "Rechazado",
                              },
                            });
                            message.success("Envio rechazado");
                            editarSeguimientoProducto(key, {
                              ...element,
                              transportadorAsignado: "Rechazado",
                            });
                          }}
                          danger
                          type="primary"
                        >
                          Rechazar
                        </Button>
                      </>
                    )}
                  </div>
                );
              }
            }
          }
          return fragmento;
        })()}
      </div>
    </div>
  );
}
