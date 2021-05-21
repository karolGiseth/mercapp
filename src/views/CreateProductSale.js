import { Button, Form, Input, message, Modal, Select } from "antd";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAccion } from "../redux/productsDucks";

import background from "../img/background.jpg";
import {
  productoParaPublicar,
  publicarProducto,
  verProductosPublicos,
} from "../helpers/api";
import { PublicProducts } from "../components/PublicProducts";
import TextArea from "antd/lib/input/TextArea";

export default function CreateProductSale() {
  const [actualizar, setActualizar] = useState(0);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products.array);
  const sesion = useSelector((store) => store.sesion.array);

  const refForm = useRef();

  const handlePublicProduct = () => {
    dispatch(obtenerProductosAccion());
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const listarProductos = () => {
    let listProducts = [];
    for (const key in products) {
      if (Object.hasOwnProperty.call(products, key)) {
        const element = products[key];
        listProducts.push(<Option key={key}>{element.nombre}</Option>);
      }
    }
    return listProducts;
  };

  const handleForm = async (datos) => {
    const productosExistentes = await verProductosPublicos();
    for (const key in productosExistentes) {
      if (Object.hasOwnProperty.call(productosExistentes, key)) {
        const element = productosExistentes[key];
        if (
          element.correo === sesion.correo &&
          element.nomProducto === datos.nomProducto
        ) {
          message.warning(
            "Este producto ya lo tiene creado, no se puede repetir"
          );
          return;
        }
      }
    }
    setTimeout(() => {
      setActualizar(actualizar + 1);
    }, 1000);
    const producto = await productoParaPublicar(datos.nomProducto);
    const productoCreado = {
      ...datos,
      correo: sesion.correo,
      vendedor: sesion.nombre,
      nombreProducto: producto.nombre,
      image: producto.image,
      telefono: sesion.telefono,
      direccion: sesion.direccion,
    };
    await publicarProducto(productoCreado);
    closeModal();
    message.success("Producto publicado correctamente");
    refForm.current.resetFields();
  };

  const { Item } = Form;
  const { Option } = Select;

  return (
    <div
      className="min-h-screen px-3 pt-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="text-3xl text-center">Mis Productos</h2>
      <div className="text-center">
        <Button type="primary" onClick={handlePublicProduct} size="large">
          Publicar Nuevo Producto
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 pt-3 mx-auto mb-11">
        <PublicProducts actualizar={actualizar} />
      </div>
      <br></br>

      <Modal
        title="Publicar producto"
        visible={modal}
        onCancel={closeModal}
        footer
        destroyOnClose
      >
        <Form onFinish={handleForm} ref={refForm}>
          <Item
            name="nomProducto"
            label="Producto"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el nombre del producto",
              },
            ]}
          >
            <Select className="w-full" placeholder="--seleccione--" showSearch>
              {listarProductos()}
            </Select>
          </Item>

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
            <Input type="number" placeholder="valor del producto" />
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
          <Item>
            <Button htmlType="submit" type="primary" size="large">
              Crear
            </Button>
          </Item>
        </Form>
      </Modal>
    </div>
  );
}
