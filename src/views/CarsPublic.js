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
  const [tienePlaca, setTienePlaca] = useState(false);
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
      message.success("Vehículo creado exitosamente");
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
                    message.warning("Vehículo eliminado ⛔");
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

  // constante para personalizar el modal
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <div
      className="min-h-screen px-3 pt-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="text-4xl text-center">Mis vehículos para MercApp</h2>
      <div className="text-center">
        <Button onClick={() => setModal(true)} type="primary" size="large">
          Crear vehículo
        </Button>
        <Modal
          title={editar.modal ? "Editar vehículo" : "Registrar vehículo"}
          visible={modal}
          onCancel={() => {
            setModal(false);
            setEditar(false);
          }}
          footer
          destroyOnClose
        >
          <Form
            {...layout}
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
                    "Por favor escriba el nombre de la marca de su vehículo 😁 👆",
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
              label="Tipo de vehículo"
              name="tipoVehiculo"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor escriba el tipo de vehículo a registrar 😁 👆",
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
                  message: "Por favor escriba el modelo de su vehículo 😁 👆",
                },
              ]}
            >
              <Select placeholder="2018">
                
                {(() => {
                  let fragmento = [];
                  for (let index = 1970; index < 2021; index++) {
                    fragmento.push(<Option value={index}>{index}</Option>);
                  }
                  return fragmento;
                })()}
              </Select>
            </Item>
            <Item label="¿Tiene placa?">
              <input
                type="checkbox"
                onChange={(e) => setTienePlaca(e.target.checked)}
              />
            </Item>
            {tienePlaca && (
              <Item
                label="Placa"
                name="placa"
                rules={[
                  {
                    required: true,
                    message: "Por favor escriba la placa de su vehículo 😁 👆",
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
            )}

            <Item
              label="Color"
              name="color"
              rules={[
                {
                  required: true,
                  message: "Por favor escriba el color de su vehículo 😁 👆",
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
                    "Por favor escriba el cilindraje de su vehículo 😁 👆",
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
                    "Por favor seleccione el combustible que usa su vehículo 😁 👆",
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
            <Item className="text-right">
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
        title="¿Esta seguro de eliminar el vehículo?"
      >
        <p>Esta accion no se puede deshacer</p>
      </Modal>
    </div>
  );
}
