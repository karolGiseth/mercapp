import { useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { crearProductos } from "../helpers/api";
import AccionesAdmin from "../views/AccionesAdmin";
import CarsPublic from "../views/CarsPublic";
import CreateProductSale from "../views/CreateProductSale";
import Envios from "../views/Envios";
import { Home } from "../views/Home";
import { Menu } from "../views/Menu";
import { Navigation } from "../views/Navigation";
import { Notifications } from "../views/Notifications";
import { Perfil } from "../views/Perfil";
import { ShoppingCart } from "../views/ShoppingCart";
import Trasnportadores from "../views/Trasnportadores";
import CompradorRoutes from "./CompradorRoutes";
import VendedorRoutes from "./VendedorRoutes";

export const Routes = () => {
  const sesion = useSelector((store) => store.sesion.array);
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {sesion ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/mercapp" component={Home} />
            <CompradorRoutes path="/menu" component={Menu} />
            <CompradorRoutes
              path="/carrito-de-compras"
              component={ShoppingCart}
            />
            <VendedorRoutes
              path="/crear-productos"
              component={crearProductos}
            />
            <Route path="/notificaciones" component={Notifications} />
            <Route path="/transportador" component={CarsPublic} />
            <Route path="/envios" component={Envios} />
            <Route path="/acciones-admin" component={AccionesAdmin} />
            <VendedorRoutes
              path="/mis-productos"
              component={CreateProductSale}
            />
            <VendedorRoutes
              path="/transportadores-disponibles"
              component={Trasnportadores}
            />
            <Route path="/perfil" component={Perfil} />
            {sesion ? <Navigation /> : <></>}
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
};
