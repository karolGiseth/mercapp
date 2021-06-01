import { Button, Form, Input, message, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  verProductosPublicos,
  editarProductoPublicado,
  eliminarProductoPublicado,
} from "../helpers/api";

export const PublicProducts = ({ actualizar }) => {
  const refForm = useRef();
  const [productos, setProductos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editarProducto, setEditarProducto] = useState([]);
  const [keyProducto, setKeyProducto] = useState("");
  const sesion = useSelector((store) => store.sesion.array);

  useEffect(() => {
    (async () => {
      setProductos(await verProductosPublicos());
    })();
  }, [actualizar]);

  const { Item } = Form;
  const { Option } = Select;

  const handleForm = (datos) => {
    const productoActualizado = { ...editarProducto, ...datos };
    editarProductoPublicado(keyProducto, productoActualizado);
    setModal(false);
    setProductos({ ...productos, [keyProducto]: productoActualizado });
    message.success(
      `${editarProducto.nombreProducto} actualizado correctamente 🙅`
    );
  };

  const eliminarProducto = (id) => {
    let datos = {};
    for (const key in productos) {
      if (Object.hasOwnProperty.call(productos, key)) {
        const element = productos[key];
        if (key !== id) {
          datos = { ...datos, [key]: element };
        }
      }
    }

    setProductos(datos);
    eliminarProductoPublicado(datos);
    message.success("Producto removido correctamente 👌");
  };

  const card = () => {
    let fragment = [];
    for (const key in productos) {
      if (Object.hasOwnProperty.call(productos, key)) {
        const element = productos[key];
        if (element.correo === sesion.correo) {
          fragment.push(
            <div
              className="col-span-4 pb-2 text-center duration-100 border border-blue-500 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm sm:transform hover:shadow-2xl rounded-tl-3xl sm:col-span-2 md:col-span-1"
              key={key}
            >
              <img
                className="object-cover w-full h-56 mx-auto rounded-tr-md rounded-tl-3xl"
                src={element.image}
                alt={element.nombreProducto}
              />
              <h2 className="mb-2 text-xl">{element.nombreProducto}</h2>
              <h2 className="mb-2 text-xl">
                Precio:{" "}
                {`$ ${element.precio}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h2>
              <p className="mb-2">{element.descripcion}</p>
              <p className="mb-2">
                Cantidad: {element.cantidadStock} {element.pesoProducto}
              </p>
              <Button
                type="primary"
                onClick={() => {
                  setModal(true);
                  setEditarProducto(element);
                  setKeyProducto(key);
                }}
              >
                Editar
              </Button>
              <Button
                danger
                type="primary"
                onClick={() => eliminarProducto(key)}
              >
                Eliminar
              </Button>
            </div>
          );
        }
      }
    }
    return fragment;
  };

  // constante para personalizar el modal
  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <>
      {card()}
      <Modal
        destroyOnClose
        onCancel={() => {
          setModal(false);
        }}
        visible={modal}
        title="Editar producto"
        footer
      >
        <Form
          {...layout}
          onFinish={handleForm}
          ref={refForm}
          initialValues={{
            pesoProducto: editarProducto.pesoProducto,
            precio: editarProducto.precio,
            descripcion: editarProducto.descripcion,
            cantidadStock: editarProducto.cantidadStock,
          }}
        >
          <Item label="Producto">{editarProducto.nombreProducto}</Item>
          <Item
            label="Peso"
            name="pesoProducto"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el tipo de peso",
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

          <Item
            name="cantidadStock"
            label="Cantidad disponible"
            rules={[
              {
                min: 1,
                required: true,
                message: "Por favor digite la cantidad del producto",
              },
            ]}
          >
            <Input min={0} placeholder="ejemplo 10 Bultos" type="number" />
          </Item>
          <Item
            name="precio"
            label="Precio del producto"
            rules={[
              {
                required: true,
                message:
                  "Es necesacio que especifique los detalles en la descripción",
              },
            ]}
          >
            <Input placeholder="valor del producto" />
          </Item>
          <Item
            name="descripcion"
            label="Descripción del producto"
            rules={[
              {
                required: true,
                message:
                  "Es necesacio que especifique los detalles en la descripción",
              },
            ]}
          >
            <TextArea placeholder="ejemplo, Precio negociable, datos de la venta, precio según cantidad, ofertas, etc..." />
          </Item>
          <Item className="text-right">
            <Button htmlType="submit" type="primary" size="large">
              Editar
            </Button>
          </Item>
        </Form>
      </Modal>
    </>
  );
};
