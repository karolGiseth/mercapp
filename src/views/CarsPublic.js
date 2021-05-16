import { Button, Form, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  crearVehiculo,
  listarVehiculos,
  eliminarVehiculo,
  actualizarVehiculo,
} from "../helpers/api";

import background from "../img/background.jpg";

export default function CarsPublic() {
  const [modal, setModal] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);
  const [editar, setEditar] = useState({
    modal: false,
    datos: null,
    key: null,
  });
  const [modalEliminar, setModalEliminar] = useState({
    modal: false,
    eliminar: null,
  });

  const sesion = useSelector((store) => store.sesion.array);

  useEffect(() => {
    (async () => {
      setVehiculos(await listarVehiculos());
    })();
  }, []);

  const formSucces = (datos) => {
    const nuevoVehiculo = { ...datos, ...sesion };
    if (editar.modal) {
      actualizarVehiculo(nuevoVehiculo, editar.key);
      setVehiculos({ ...vehiculos, [editar.key]: nuevoVehiculo });
      message.success("Vehiculo actualizado exitosamente");
    } else {
      const data = crearVehiculo(nuevoVehiculo);
      setVehiculos({ ...vehiculos, [data]: nuevoVehiculo });
      message.success("Vehiculo creado exitosamente");
    }
    setModal(false);
    setEditar({ ...editar, modal: false });
  };

  const cardVehiculo = () => {
    let fragmento = [];
    for (const key in vehiculos) {
      if (Object.hasOwnProperty.call(vehiculos, key)) {
        const element = vehiculos[key];
        if (element.correo === sesion.correo) {
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
              </div>
              <Button
                onClick={() => {
                  setEditar({ datos: element, modal: true, key });
                  setModal(true);
                }}
                type="primary"
                size="large"
                className="mb-2"
              >
                Editar
              </Button>
              <Button
                danger
                type="primary"
                size="large"
                className="mb-2 ml-2"
                onClick={() => {
                  const eliminar = () => {
                    let data = {};
                    for (const key2 in vehiculos) {
                      if (Object.hasOwnProperty.call(vehiculos, key2)) {
                        const element2 = vehiculos[key2];
                        if (key2 !== key) {
                          data = { ...data, [key2]: element2 };
                        }
                      }
                    }
                    setVehiculos(data);
                    eliminarVehiculo(data);
                    message.warning("Vehiculo eliminado ⛔");
                    setModalEliminar({ modal: false, eliminar: null });
                  };
                  setModalEliminar({ modal: true, eliminar });
                }}
              >
                Eliminar
              </Button>
            </div>
          );
        }
      }
    }
    return fragmento;
  };

  const { Item } = Form;
  return (
    <div
      className="min-h-screen px-3 pt-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="text-4xl text-center">Mis vehiculos para MercApp</h2>
      <div className="text-center">
        <Button onClick={() => setModal(true)} type="primary" size="large">
          Crear vehiculo
        </Button>
        <Modal
          title={editar.modal ? "Editar vehiculo" : "Registrar vehiculo"}
          visible={modal}
          onCancel={() => {
            setModal(false);
            setEditar(false);
          }}
          footer
          destroyOnClose
        >
          <Form
            onFinish={formSucces}
            initialValues={
              editar.modal
                ? {
                    ...editar.datos,
                  }
                : {}
            }
          >
            <Item
              label="Marca"
              name="marca"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor escriba el nombre de la marca de su vehiculo 😁 👆",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Tipo de vehiculo"
              name="tipoVehiculo"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor escriba el tipo de vehiculo a registrar 😁 👆",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Modelo"
              name="modelo"
              rules={[
                {
                  required: true,
                  message: "Por favor escriba el modelo de su vehiculo 😁 👆",
                },
              ]}
            >
              <Input min={0} type="number" />
            </Item>
            <Item
              label="Placa"
              name="placa"
              rules={[
                {
                  required: true,
                  message: "Por favor escriba la placa de su vehiculo 😁 👆",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Color"
              name="color"
              rules={[
                {
                  required: true,
                  message: "Por favor escriba el color de su vehiculo 😁 👆",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Cilindraje"
              name="cilindraje"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor escriba el cilindraje de su vehiculo 😁 👆",
                },
              ]}
            >
              <Input type="number" />
            </Item>
            <Item
              label="Tipo de carrocería"
              name="TipoCarroceria"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor escriba el tipo de carrosería de su vehiculo 😁 👆",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Tipo de combustible"
              name="tipoCombustible"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor escriba el combustible que usa su vehiculo 😁 👆",
                },
              ]}
            >
              <Input />
            </Item>
            <br />
            <Item className="text-center">
              <Button htmlType="submit" type="primary" size="large">
                Guardar
              </Button>
            </Item>
          </Form>
        </Modal>
      </div>
      <div className="flex-col m-3">{cardVehiculo()}</div>
      <br />
      <Modal
        onCancel={() => setModalEliminar({ modal: false, eliminar: null })}
        onOk={modalEliminar.eliminar}
        visible={modalEliminar.modal}
        title="¿Esta seguro de eliminar el vehiculo?"
      ></Modal>
    </div>
  );
}
