import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AddProductIcon } from "../helpers/icons/AddProductIcon";
import { AjustesIcon } from "../helpers/icons/AjustesIcon";
import { CampaignIcon } from "../helpers/icons/CampaignIcon";
import { HomeIcon } from "../helpers/icons/HomeIcon";
import LibretaIcon from "../helpers/icons/LibretaIcon";
import { MenuIcon } from "../helpers/icons/MenuIcon";
import MundoIcon from "../helpers/icons/MundoIcon";
import { PerfilIcon } from "../helpers/icons/PerfilIcon";
import { ShoppingCartIcon } from "../helpers/icons/ShoppingCartIcon";

export const Navigation = () => {
  const sesion = useSelector((store) => store.sesion.array);

  return (
    <div className="fixed bottom-0 flex items-center justify-around w-full py-1 bg-white border">
      <NavLink
        exact
        activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
        to="/mercapp"
      >
        <HomeIcon />
      </NavLink>
      {sesion.rol === "comprador" && (
        <NavLink
          exact
          activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
          to="/menu"
        >
          <MenuIcon />
        </NavLink>
      )}
      {sesion.rol === "comprador" && (
        <NavLink
          exact
          activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
          to="/carrito-de-compras"
        >
          <ShoppingCartIcon />
        </NavLink>
      )}
      {sesion.rol === "vendedor" && (
        <NavLink
          exact
          activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
          to="/notificaciones"
        >
          <CampaignIcon />
        </NavLink>
      )}
      {sesion.rol === "transportador" && (
        <NavLink
          exact
          activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
          to="/transportador"
        >
          <AjustesIcon />
        </NavLink>
      )}
      {sesion.rol === "transportador" && (
        <NavLink
          exact
          activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
          to="/envios"
        >
          <MundoIcon />
        </NavLink>
      )}
      {sesion.rol === "vendedor" && (
        <NavLink
          exact
          activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
          to="/mis-productos"
        >
          <AddProductIcon />
        </NavLink>
      )}
      {sesion.rol === "vendedor" && (
        <NavLink
          exact
          activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
          to="/transportadores-disponibles"
        >
          <LibretaIcon />
        </NavLink>
      )}
      {sesion.rol === "administrador" && (
        <NavLink
          exact
          activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
          to="/acciones-admin"
        >
          <AjustesIcon />
        </NavLink>
      )}
      <NavLink
        exact
        activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
        to="/perfil"
      >
        <PerfilIcon />
      </NavLink>
    </div>
  );
};
