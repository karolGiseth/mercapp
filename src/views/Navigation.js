import { Popover } from "antd";
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
      <Popover content="Inicio">
        <NavLink
          exact
          activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
          to="/mercapp"
        >
          <HomeIcon />
        </NavLink>
      </Popover>
      {sesion.rol === "comprador" && (
        <Popover content="Productos">
          <NavLink
            exact
            activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
            to="/menu"
          >
            <MenuIcon />
          </NavLink>
        </Popover>
      )}
      {sesion.rol === "comprador" && (
        <Popover content="Carrito de compras">
          <NavLink
            exact
            activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
            to="/carrito-de-compras"
          >
            <ShoppingCartIcon />
          </NavLink>
        </Popover>
      )}
      {sesion.rol === "vendedor" && (
        <Popover content="Mis ventas">
          <NavLink
            exact
            activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
            to="/notificaciones"
          >
            <CampaignIcon />
          </NavLink>
        </Popover>
      )}
      {sesion.rol === "transportador" && (
        <Popover content="Mis vehículos">
          <NavLink
            exact
            activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
            to="/transportador"
          >
            <AjustesIcon />
          </NavLink>
        </Popover>
      )}
      {sesion.rol === "transportador" && (
        <Popover content="Envíos">
          <NavLink
            exact
            activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
            to="/envios"
          >
            <MundoIcon />
          </NavLink>
        </Popover>
      )}
      {sesion.rol === "vendedor" && (
        <Popover content="Agregar producto">
          <NavLink
            exact
            activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
            to="/mis-productos"
          >
            <AddProductIcon />
          </NavLink>
        </Popover>
      )}
      {sesion.rol === "vendedor" && (
        <Popover content="Agenda de transportadores">
          <NavLink
            exact
            activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
            to="/transportadores-disponibles"
          >
            <LibretaIcon />
          </NavLink>
        </Popover>
      )}
      {sesion.rol === "administrador" && (
        <Popover content="Crear producto">
          <NavLink
            exact
            activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
            to="/acciones-admin"
          >
            <AjustesIcon />
          </NavLink>
        </Popover>
      )}
      <Popover content="Mi cuenta">
        <NavLink
          exact
          activeClassName="border-t-4 border-blue-500 transform -translate-y-2"
          to="/perfil"
        >
          <PerfilIcon />
        </NavLink>
      </Popover>
    </div>
  );
};
