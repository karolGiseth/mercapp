import { Redirect, Route } from "react-router";

export default function VendedorRoutes({ component: Component, ...rest }) {
  // const user = null;
  const user = { nombre: "asasda", rol: "comprador" };

  return (
    <Route {...rest}>{user ? <Component /> : <Redirect to="/login" />}</Route>
  );
}
