import { Button, Form, Input, message, Modal, Select } from "antd";
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

  const { Option } = Select;

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
                {
                  pattern: "[a-zA-Z ]{3,254}",
                  message: "El nombre solo debe contener letras",
                },
              ]}
            >
              <Input placeholder="mazda" />
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
              <Select placeholder="moto" showSearch>
                <Option value="Vehículo de tracción animal">
                  Vehículo de tracción animal
                </Option>
                <Option value="Bicicleta">Bicicleta</Option>
                <Option value="Ciclomotor">Ciclomotor</Option>
                <Option value="Motocicleta">Motocicleta</Option>
                <Option value="Motocarro">Motocarro</Option>
                <Option value="Automóvil de tres ruedas">
                  Automóvil de tres ruedas
                </Option>
                <Option value="Autobús o autocar MMA 3.500 kg (ligero)">
                  Autobús o autocar MMA 3.500 kg (ligero)
                </Option>
                <Option value="Camión MMA 3.500 kg (ligero)">
                  Camión MMA 3.500 kg (ligero)
                </Option>
                <Option value="Furgón/Furgoneta MMA 3.500 kg (ligero)">
                  Furgón/Furgoneta MMA 3.500 kg (ligero)
                </Option>
                <Option value="Tractor agrícola">Tractor agrícola</Option>
              </Select>
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
              <Select placeholder="2018">
                <Option>1991</Option>
                {(() => {
                  let fragmento = [];
                  for (let index = 1990; index < 2021; index++) {
                    fragmento.push(<Option value={index}>{index}</Option>);
                  }
                  return fragmento;
                })()}
              </Select>
            </Item>
            <Item
              label="Placa"
              name="placa"
              rules={[
                {
                  required: true,
                  message: "Por favor escriba la placa de su vehiculo 😁 👆",
                },
                {
                  min: 3,
                  message:
                    "Por favor verifique el valor ingresado, el número de placa debe tener por lo menos 5 caracteres.",
                },
                {
                  pattern: "[a-zA-Z]{3}[0-9]{3}|[a-zA-Z]{3}[0-9]{2}[a-zA-Z]",
                  message: "Verifique el formato de la placa",
                },
              ]}
            >
              <Input
                placeholder="para bicicleta escribir ABC123"
                className="uppercase"
              />
            </Item>
            <Item
              label="Color"
              name="color"
              rules={[
                {
                  required: true,
                  message: "Por favor escriba el color de su vehiculo 😁 👆",
                },
                {
                  pattern: "[a-zA-Z ]{3,254}",
                  message: "El color solo debe contener letras",
                },
              ]}
            >
              <Input placeholder="rojo" />
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
              <Input
                min="1"
                type="number"
                placeholder="valor numerico, para bicicleta poner 1"
              />
            </Item>
            <Item
              label="Tipo de combustible"
              name="tipoCombustible"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor seleccione el combustible que usa su vehiculo 😁 👆",
                },
              ]}
            >
              <Select mode="tags" placeholder="Gas, Gasolina o ambos">
                <Option value="Gasolina">Gasolina</Option>
                <Option value="Gas">Gas</Option>
                <Option value="No aplica para Bicicleta">
                  No aplica para Bicicleta
                </Option>
              </Select>
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
