import { Button, Modal, Form, message } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import logo from "../img/logo.png";
import { carritoCompras } from "../helpers/api";

export const CardProduct = ({
  image,
  nomProducto,
  descripcion,
  cantidadStock,
  pesoProducto,
  vendedor,
  precio,
  correoVendedor,
  correoComprador,
  direccion,
  comprador,
}) => {
  const [modal, setModal] = useState(false);

  const cerrarModal = () => {
    setModal(false);
  };

  const formSucces = () => {
    carritoCompras({
      image,
      nomProducto,
      descripcion,
      cantidadStock,
      pesoProducto,
      vendedor,
      precio,
      correoVendedor,
      correoComprador,
      estado: "Pendiente de envío",
      direccion,
      comprador,
    });
    cerrarModal();
    message.success("Agregado al carrito");
  };

  // contante para personalizar el modal
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <div className="col-span-4 pb-2 text-center duration-100 border border-blue-500 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm sm:transform hover:scale-105 hover:shadow-2xl rounded-tl-3xl sm:col-span-2 md:col-span-1">
      <img
        className="mx-auto rounded-tr-md rounded-tl-3xl "
        src={image ? image : logo}
        alt={"imagen " + nomProducto}
      />
      {nomProducto && <h2 className="mb-2 text-3xl">{nomProducto}</h2>}
      {descripcion && <p className="mb-2">{descripcion}</p>}
      {cantidadStock && (
        <p className="mb-2">
          Disponible: {cantidadStock} {pesoProducto}
        </p>
      )}
      {vendedor && <p className="mb-2">Vendedor: {vendedor}</p>}
      {precio && <p className="mb-2">Precio: {precio}</p>}

      <Button
        onClick={() => setModal(true)}
        type="primary"
        icon={<PlusOutlined />}
      >
        Agregar al carrito
      </Button>
      <Modal
        destroyOnClose
        title="¿Agregar producto al carrito?"
        visible={modal}
        onCancel={cerrarModal}
        footer
      >
        <Form {...layout} onFinish={formSucces}>
          <Button className="mr-2" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Agregar
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
