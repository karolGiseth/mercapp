import { Button, Input, Form, message, Popover } from "antd";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { crearProductos } from "../helpers/api";
import background from "../img/background.jpg";

export default function AccionesAdmin() {
  const [vistaPrevia, setVistaPrevia] = useState(
    "http://www.pequenomundo.cl/wp-content/themes/childcare/images/default.png"
  );
  const refForm = useRef();
  const history = useHistory();

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
        <Popover
          title="Vista previa"
          content="Asi se vera la imagen cuando cree el producto"
        >
          <img
            className="object-cover w-full h-56 mx-auto rounded-3xl"
            src={vistaPrevia}
            alt="vista previa"
          />
        </Popover>
        <br />
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
            <Input
              placeholder="Pegue la url de la imagen"
              type="url"
              onChange={(e) => setVistaPrevia(e.target.value)}
            />
          </Item>
          <Item className="flex justify-center">
            <br />
            <Button htmlType="submit" type="primary" size="large">
              Guardar
            </Button>
          </Item>
        </Form>
        <p className="text-center">
          Sitio recomendado para buscar las imagenes{" "}
          <a
            href="https://pixabay.com/es/images/search/frutas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aqui
          </a>
        </p>
        <Item className="text-center">
          <Button danger type="primary" onClick={() => history.push("/login")}>
            Salir
          </Button>
        </Item>
      </div>
    </div>
  );
}
