import { Button, Form, Input, message, Select } from "antd";
import { Link, useHistory } from "react-router-dom";
import background from "../img/background.jpg";
import logo from "../img/logo.png";
import { login } from "../helpers/api";
import { useDispatch } from "react-redux";
import { sesionIniciadaAccion } from "../redux/authDucks";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { Item } = Form;
  const { Option } = Select;

  const formSucces = async (datos) => {
    const credenciales = await login();
    let isLogged = false;
    for (const key in credenciales) {
      if (Object.hasOwnProperty.call(credenciales, key)) {
        const {
          nombre,
          contraseña,
          correo,
          rol,
          departamento,
          ciudad,
          direccion,
          telefono,
        } = credenciales[key];
        if (
          contraseña === datos.contraseña &&
          correo === datos.correo &&
          rol === datos.rol
        ) {
          message.success(`Bienvenido ${nombre}`);
          isLogged = true;
          dispatch(
            sesionIniciadaAccion({
              nombre,
              contraseña,
              correo,
              rol,
              departamento,
              ciudad,
              direccion,
              telefono,
            })
          );
          history.push("/mercapp");
        }
      }
    }
    isLogged === false &&
      message.error("Correo, contraseña o tipo de usuario incorrectos ");
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
        <img className="h-32 m-auto" src={logo} alt="logo mercapp" />
        <br />
        <h2 className="text-4xl text-center ">Login</h2>
        <br />
        <div className="px-6">
          <Form onFinish={formSucces}>
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
              <Input
                type="email"
                size="large"
                placeholder="tucorreo@email.com"
              />
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
              <Input.Password
                size="large"
                type="password"
                placeholder="********"
              />
            </Item>
            <Item
              name="rol"
              label="Ingresar como"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione una opción",
                },
              ]}
            >
              <Select placeholder="--Seleccione--" size="large" showSearch>
                <Option value="comprador">comprador</Option>
                <Option value="vendedor">vendedor</Option>
                <Option value="transportador">transportador</Option>
                <Option value="administrador">administrador</Option>
              </Select>
            </Item>
            <br />
            <Item className="text-center">
              <Button type="primary" htmlType="submit" size="large">
                Ingresar
              </Button>
            </Item>
            <br />
          </Form>
          <Link to="/register">
            ¿Aun no tienes una cuenta?, click aqui para registrarte
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
}
