import { Button, Modal, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import logo from "../img/logo.png";

export const CardProduct = ({
  image,
  nomProducto,
  descripcion,
  cantidadStock,
  pesoProducto,
  vendedor,
}) => {
  const [modal, setModal] = useState(false);
  const [formCarrito, setFormCarrito] = useState({
    cantidad: "",
    peso: "",
  });

  const { Item } = Form;
  const { Option } = Select;

  const cerrarModal = () => {
    setModal(false);
  };

  const formSucces = ({ cantidad, peso }) => {
    setFormCarrito({
      ...formCarrito,
      cantidad,
      peso,
    });
    cerrarModal();
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

      <Button
        onClick={() => setModal(true)}
        type="primary"
        icon={<PlusOutlined />}
      >
        Agregar al carrito
      </Button>
      <Modal
        title="Agregar al carrito"
        visible={modal}
        onCancel={cerrarModal}
        footer
      >
        <Form {...layout} onFinish={formSucces}>
          <Item
            label="Cantidad"
            name="cantidad"
            rules={[
              {
                required: true,
                message: "Por favor ingrese un valor numerico",
              },
            ]}
          >
            <Input type="number" />
          </Item>
          <Item
            label="Peso"
            name="peso"
            rules={[
              {
                required: true,
                message: "Por favor seleccione una opcion",
              },
            ]}
          >
            <Select className="w-full" placeholder="--seleccione--" showSearch>
              <Option value="Lb">Lb</Option>
              <Option value="Kg">Kg</Option>
              <Option value="Arroba">Arroba</Option>
              <Option value="Bulto">Bulto</Option>
            </Select>
          </Item>
          <Item>
            <Button className="mr-2" onClick={cerrarModal}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Item>
        </Form>
      </Modal>
    </div>
  );
};
