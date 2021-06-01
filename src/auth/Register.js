import { Button, Checkbox, Form, Input, message, Popover, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  ciudadesPorDepartamento,
  departamentosColombia,
  login,
  register,
} from "../helpers/api";
import background from "../img/background.jpg";

export default function Register() {
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [credenciales, setCredenciales] = useState([]);
  const [politicas, setPoliticas] = useState(false);
  const history = useHistory();

  const refResetForm = useRef();

  useEffect(() => {
    (async () => {
      setDepartamentos(await departamentosColombia());
      setCredenciales(await login());
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
    let registrar = true;
    for (const key in credenciales) {
      if (Object.hasOwnProperty.call(credenciales, key)) {
        const { correo, rol } = credenciales[key];
        if (correo === datos.correo && rol === datos.rol) {
          message.warning("El usuario ya se encuentra registrado");
          registrar = false;
        }
      }
    }
    if (registrar) {
      register(datos);
      message.success("Registrado correctamente");
      refResetForm.current.resetFields();
      history.push("/login");
    }
  };

  // constante para personalizar el modal
  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 18,
    },
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
          <Form {...layout} onFinish={formSucces} ref={refResetForm}>
            <Item
              name="nombre"
              label="Nombre Completo"
              rules={[
                {
                  required: true,
                  message: "Por favor digite su nombre completo",
                },
                {
                  pattern: "[a-zA-Z ]{3,254}",
                  message: "El nombre solo debe contener letras",
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
            <Item
              name="politicas"
              label="Politica de privacidad"
              rules={[
                {
                  validator: (_, value) =>
                    politicas
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "Por favor acepte los terminos y condiciones para registrarse"
                          )
                        ),
                },
              ]}
            >
              <Checkbox onChange={(e) => setPoliticas(e.target.checked)}>
                <Popover
                  title="Política de Privacidad"
                  content={
                    <p>
                      MercApp te informa sobre su Política de Privacidad
                      respecto del tratamiento y protección de los datos de
                      carácter personal de los usuarios y clientes que puedan
                      ser recabados por la navegación o contratación de
                      servicios a través del sitio Web. En este sentido, MercApp
                      garantiza el cumplimiento de la normativa vigente en
                      materia de protección de datos personales, reflejada en la
                      Ley Orgánica 3/2018, de 5 de diciembre, de Protección de
                      Datos Personales y de Garantía de Derechos Digitales (LOPD
                      GDD). Cumple también con el Reglamento (UE) 2016/679 del
                      Parlamento Europeo y del Consejo de 27 de abril de 2016
                      relativo a la protección de las personas físicas (RGPD).
                      El uso de mercapp implica la aceptación de esta Política
                      de Privacidad así como las condiciones incluidas en el
                      Aviso Legal.
                    </p>
                  }
                >
                  <a> Si, acepto la política de privacidad de MercApp</a>
                </Popover>
              </Checkbox>
            </Item>
            <br />
            <Item className="text-right">
              {politicas ? (
                <Button htmlType="submit" type="primary" size="large">
                  Registrar Usuario
                </Button>
              ) : (
                <Button htmlType="submit" disabled type="primary" size="large">
                  Registrar Usuario
                </Button>
              )}

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
