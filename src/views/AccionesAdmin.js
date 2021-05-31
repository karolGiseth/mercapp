import { Button, Input, Form, message } from "antd";
import { useRef } from "react";
import { crearProductos } from "../helpers/api";
import background from "../img/background.jpg";

export default function AccionesAdmin() {
  const refForm = useRef();

  const { Item } = Form;

  const formSucces = (datos) => {
    crearProductos(datos);
    refForm.current.resetFields();
    message.success("Producto creado");
  };

  // constante para personalizar el modal
  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <div
      className="min-h-screen pt-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className="px-5 py-10 mx-3 border border-blue-500 rounded-lg backdrop-blur backdrop-filter rounded-tl-3xl sm:mx-auto sm:w-3/4 lg:w-1/2"
        style={{ boxShadow: "-1px 2px 33px 0px rgba(59,160,191,1)" }}
      >
        <h2 className="mb-10 text-3xl text-center">Crear Producto</h2>
        <Form
          {...layout}
          ref={refForm}
          onFinish={formSucces}
          className="text-center"
        >
          <Item
            name="nombre"
            label="Nombre del producto"
            rules={[
              {
                required: true,
                message: "Por favor ingrese un el nombre del producto",
              },
            ]}
          >
            <Input placeholder="ejemplo tomate de arbol" />
          </Item>
          <Item
            name="image"
            label="Url Imagen"
            rules={[
              {
                required: true,
                message: "Por favor ingrese una url",
              },
            ]}
          >
            <Input placeholder="Pegue la url de la imagen" type="url" />
          </Item>
          <Item className="text-right">
            <br />
            <Button htmlType="submit" type="primary" size="large">
              Guardar
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
}
