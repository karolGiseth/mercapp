import { Redirect, Route } from "react-router";

export default function CompradorRoutes({ component: Component, ...rest }) {
  const user = { nombre: "asasda", rol: "comprador" };

  return (
    <Route {...rest}>
      {user?.rol === "comprador" ? <Component /> : <Redirect to="/" />}
    </Route>
  );
}
