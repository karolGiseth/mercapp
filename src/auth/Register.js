import { Button, Form, Input, message, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  ciudadesPorDepartamento,
  departamentosColombia,
  register,
} from "../helpers/api";
import background from "../img/background.jpg";

export default function Register() {
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const history = useHistory();

  const refResetForm = useRef();

  useEffect(() => {
    (async () => {
      setDepartamentos(await departamentosColombia());
    })();
  }, []);

  const { Item } = Form;
  const { Option } = Select;

  const handleChange = (e) => {
    (async () => {
      setCiudades(await ciudadesPorDepartamento(e));
    })();
  };

  const formSucces = (datos) => {
    register(datos);
    message.success("Registrado correctamente");
    refResetForm.current.resetFields();
    history.push("/login");
  };

  return (
    <div
      className="min-h-screen pt-5"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className="mx-1 mb-10 border rounded-lg shadow-2xl sm:mx-auto md:p-10 sm:w-3/4 lg:w-1/2 backdrop-filter backdrop-blur-sm"
        style={{ boxShadow: "-1px 2px 33px 0px rgba(59,160,191,1)" }}
      >
        <br />
        <h2 className="text-4xl text-center ">Registro</h2>
        <br />
        <div className="px-6">
          <Form onFinish={formSucces} ref={refResetForm}>
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
              <Input placeholder="pepito@gmail.com" type="email" />
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
                <Option value="comprador">comprador</Option>
                <Option value="vendedor">vendedor</Option>
                <Option value="transportador">transportador</Option>
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
              <select className="w-full p-1 bg-white border border-gray-300 focus:outline-none focus:border-blue-400">
                <option></option>
                {ciudades.map((item) =>
                  item?.ciudades?.map((el) => <option key={el}>{el}</option>)
                )}
              </select>
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
                  message: "Por favor ingrese su clave entre 7 y 20 caracteres",
                },
              ]}
            >
              <Input.Password placeholder="Algo que recuerde facilmente" />
            </Item>
            <br />
            <Item className="text-center">
              <Button htmlType="submit" type="primary" size="large">
                Registrar Usuario
              </Button>
              <br />
              <br />
            </Item>
          </Form>
          <Link to="/login">
            ¿Ya tienes una cuenta?, click aqui para ir a iniciar sesión
          </Link>
          <br />
          <br />
        </div>
      </div>
      <br />
    </div>
  );
}
