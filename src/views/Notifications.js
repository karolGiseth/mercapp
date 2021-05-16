import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { verCarrito, editarSeguimientoProducto } from "../helpers/api";

import background from "../img/background.jpg";

export const Notifications = () => {
  const [buscar, setBuscar] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [datosActualizados, setDatosActualizados] = useState([]);
  const [key, setKey] = useState("");
  const [modal, setModal] = useState(false);
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
        if (
          element.correoVendedor === sesion.correo &&
          element.comprado === true
        ) {
          buscar === "" &&
            fragment.push(
              <div
                className="col-span-4 pb-2 m-5 text-center duration-100 border border-blue-500 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm sm:transform hover:scale-105 hover:shadow-2xl rounded-tl-3xl sm:col-span-2 md:col-span-1"
                key={key}
              >
                <img
                  className="mx-auto rounded-tr-md rounded-tl-3xl "
                  src={element.image}
                  alt={element.nomProducto}
                />
                <h2 className="text-2xl text-center">{element.nomProducto}</h2>
                <p>Comprador: {element.comprador}</p>
                <p>Email del comprador: {element.correoComprador}</p>
                <p>Dirección: {element.direccion}</p>
                <p>Precio: {element.precio}</p>
                <p>
                  Cantidad: {element.cantidadStock} {element.pesoProducto}
                </p>
                <p className="p-3 font-semibold text-white bg-blue-500">
                  Seguimiento: {element.estado}
                </p>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    setModal(true);
                    setDatosActualizados(element);
                    setKey(key);
                  }}
                >
                  Editar seguimiento
                </Button>
              </div>
            );
          if (
            element.comprador.toLowerCase().includes(buscar.toLowerCase()) &&
            buscar !== ""
          ) {
            fragment.push(
              <div
                className="col-span-4 pb-2 m-5 text-center duration-100 border border-blue-500 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm sm:transform hover:scale-105 hover:shadow-2xl rounded-tl-3xl sm:col-span-2 md:col-span-1"
                key={key + 1}
              >
                <img
                  className="mx-auto rounded-tr-md rounded-tl-3xl "
                  src={element.image}
                  alt={element.nomProducto}
                />
                <h2 className="text-2xl text-center">{element.nomProducto}</h2>
                <p>Comprador: {element.comprador}</p>
                <p>Email del comprador: {element.correoComprador}</p>
                <p>Dirección: {element.direccion}</p>
                <p>Precio: {element.precio}</p>
                <p>
                  Cantidad: {element.cantidadStock} {element.pesoProducto}
                </p>
                <p className="p-3 font-semibold text-white bg-blue-500">
                  Seguimiento: {element.estado}
                </p>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    setModal(true);
                    setDatosActualizados(element);
                    setKey(key);
                  }}
                >
                  Editar seguimiento
                </Button>
              </div>
            );
          }
        }
      }
    }
    return fragment;
  };

  const formSucces = (datos) => {
    setModal(false);
    const data = { ...datosActualizados, ...datos };
    setCarrito({ ...carrito, [key]: data });
    editarSeguimientoProducto(key, data);
    message.success("Seguimiento actualizado 🤑");
  };

  const { Option } = Select;
  const { Item } = Form;

  return (
    <div
      className="min-h-screen pt-5"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="text-4xl text-center">Ventas</h2>
      <div className="mx-auto md:w-1/2">
        <Form>
          <Item name="buscar">
            <Input
              placeholder="Buscar por nombre del comprador"
              type="search"
              onChange={(e) => setBuscar(e.target.value)}
            />
          </Item>
        </Form>
      </div>

      <div className="grid grid-cols-4 sm:px-10">{cartProduct()}</div>
      <Modal
        title="Actualizar seguimiento del envio"
        visible={modal}
        onCancel={() => setModal(false)}
        footer
        destroyOnClose
      >
        <Form onFinish={formSucces}>
          <Item
            name="estado"
            rules={[
              {
                required: true,
                message: "Por favor seleccione una opción",
              },
            ]}
          >
            <Select placeholder="--seleccione--">
              <Option value="Procesando pedido">Procesando pedido</Option>
              <Option value="Enviado con el transportista">
                Enviado con el transportista
              </Option>
              <Option value="Entregado">Entregado</Option>
            </Select>
          </Item>
          <Item className="text-center">
            <Button type="primary" htmlType="submit" size="large">
              Actualizar
            </Button>
          </Item>
        </Form>
      </Modal>
      <br />
      <br />
      <br />
    </div>
  );
};
