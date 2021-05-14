import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ciudadesPorDepartamento,
  departamentosColombia,
  editarCuenta,
} from "../helpers/api";
import avatar from "../img/avatar.jpg";
import background from "../img/background.jpg";
import { sesionCerradaAccion } from "../redux/authDucks";

export const Perfil = memo(() => {
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const sesion = useSelector((store) => store.sesion.array);

  useEffect(() => {
    (async () => {
      setDepartamentos(await departamentosColombia());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setDepartamentos(await departamentosColombia());
    })();
  }, []);

  const handleChange = (e) => {
    (async () => {
      setCiudades(await ciudadesPorDepartamento(e));
    })();
  };

  const formSucces = (datos) => {
    message.success("Editado correctamente");
    message.warning("Inicie sesión nuevamente para ver los cambios...");
    editarCuenta(sesion.key, datos);
    setModal(false);
  };

  const { Item } = Form;
  const { Option } = Select;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className="mx-5 text-center transform translate-y-12 border rounded-lg shadow-2xl sm:mx-32 backdrop-filter backdrop-blur-sm"
        style={{ boxShadow: "-1px 2px 33px 0px rgba(59,160,191,1)" }}
      >
        <img
          className="h-40 mx-auto my-5 rounded-full"
          src={avatar}
          alt="foto de perfil"
        />
        <br />
        <h2 className="text-xl uppercase">{sesion.nombre}</h2>
        <p className="uppercase">{sesion.rol}</p>
        <p>{sesion.correo}</p>
        <br />
        <div className="flex justify-center w-full my-4 ">
          <Button type="primary" onClick={() => setModal(true)}>
            Editar perfil
          </Button>
        </div>
        <div className="flex justify-center w-full my-4 mb-10">
          <Button
            onClick={() => {
              dispatch(sesionCerradaAccion());
              message.success("Sesión cerrada correctamente");
            }}
          >
            Cerrar Sesión
          </Button>
          <Modal
            visible={modal}
            title="Editar perfil"
            onCancel={() => setModal(false)}
            footer
            destroyOnClose
          >
            <Form
              onFinish={formSucces}
              initialValues={{
                nombre: sesion.nombre,
                correo: sesion.correo,
                rol: sesion.rol,
                departamento: sesion.departamento,
                ciudad: sesion.ciudad,
                direccion: sesion.direccion,
                telefono: sesion.telefono,
                contraseña: sesion.contraseña,
              }}
            >
              <Item
                name="nombre"
                label="Nombre Completo"
                rules={[
                  {
                    required: true,
                    message: "Por favor digite su nombre completo",
                  },
                ]}
              >
                <Input placeholder="Pepito perez" />
              </Item>
              <Item
                name="correo"
                label="Correo electrónico"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese un correo electrónico",
                  },
                ]}
              >
                <Input readOnly placeholder="pepito@gmail.com" type="email" />
              </Item>
              <Item
                name="rol"
                label="Tipo de usuario"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione una opción",
                  },
                ]}
              >
                <Select placeholder="--Seleccione--" showSearch>
                  <Option value={sesion.rol}>{sesion.rol}</Option>
                </Select>
              </Item>
              <Item
                name="departamento"
                label="Departamento"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione una opción",
                  },
                ]}
              >
                <Select
                  placeholder="--seleccione--"
                  showSearch
                  onChange={handleChange}
                >
                  {departamentos?.map((el) => (
                    <Option key={el.departamento}>{el.departamento}</Option>
                  ))}
                </Select>
              </Item>
              <Item
                name="ciudad"
                label="Ciudad"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione una opción",
                  },
                ]}
              >
                <Select className="w-full p-1 bg-white border border-gray-300 focus:outline-none focus:border-blue-400">
                  <Option></Option>
                  {ciudades.map((item) =>
                    item?.ciudades?.map((el) => <Option key={el}>{el}</Option>)
                  )}
                </Select>
              </Item>
              <Item
                name="direccion"
                label="Dirección de recidencia"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su dirección",
                  },
                ]}
              >
                <Input placeholder="calle siempre viva - springfield" />
              </Item>
              <Item
                name="telefono"
                label="Numero telefonico"
                rules={[
                  {
                    min: 7,
                    max: 10,
                    required: true,
                    message:
                      "Por favor ingrese su numero de celular o fijo entre 7 y 10 digitos",
                  },
                ]}
              >
                <Input placeholder="123456789" type="number" />
              </Item>
              <Item
                name="contraseña"
                label="Contraseña"
                rules={[
                  {
                    min: 7,
                    max: 20,
                    required: true,
                    message:
                      "Por favor ingrese su clave entre 7 y 20 caracteres",
                  },
                ]}
              >
                <Input.Password placeholder="Algo que recuerde facilmente" />
              </Item>
              <Item className="text-center">
                <Button htmlType="submit" type="primary" size="large">
                  Actualizar Perfil
                </Button>
              </Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
});
