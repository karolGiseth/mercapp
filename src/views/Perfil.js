import { Button, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../img/avatar.jpg";
import background from "../img/background.jpg";
import { sesionCerradaAccion } from "../redux/authDucks";

export const Perfil = () => {
  const dispatch = useDispatch();
  const sesion = useSelector((store) => store.sesion.array);
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
          <Button type="primary">Editar perfil</Button>
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
        </div>
      </div>
    </div>
  );
};
