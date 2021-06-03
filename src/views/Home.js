import React from "react";
import background from "../img/background.jpg";
import logo from "../img/logo.png";
import comprador from "../img/comprador.png";
import vendedor from "../img/vendedor.png";
import transportador from "../img/transportador.png";
import { useSelector } from "react-redux";

const parrafoComprador =
  "El aplicativo permite el cargue de una gran cantidad de  productos que están a su disposición, comprando por este medio usted esta contribuyendo a la mano de obra colombiana, pero además usted se asegura que los productos que usted eligió son de calidad y que llegarán en buen estado , por ello por medio del aplicativo podrá revisar el estado de su pedido y este le llegará a la puerta de su casa , tendrá mejor comunicación con su contraparte , reducirá tiempos, disminuirá gastos innecesarios, podrá comprar las 24 horas los 7 días de la semana. Lo invito a que haga parte del cambio, a apoyar la causa y a hacer parte de la era digital.";
const parrafoVendedor =
  "Este es un proyecto de innovación construido como proyecto de grado de la autora Karol Giseth Acuña Hernandez , quien con su intención de contribuir a la población campesina dolientes por temas como la economía , la brecha social , riesgos de contagio en épocas de covid, construyó un aplicativo web para la facilidad de distribución de sus productos que hacen parte de la canasta familiar, de manera que el usted , como campesino no tendrá que trasladarse o someterse a viajes largos para llevar sus productos a centros de acopio y aun mejor , sus productos serán remunerados a un precio justo eliminando los intermediarios y dando valor a su trabajo como agricultor y como ente importante a nivel Colombia para la manutención alimentaria del país.";
const parrafoTransportador =
  "Por otro lado, se pensó en la generación de empleo por medio de la plataforma, la cual usted como transportador podrá hacer el domicilio de los productos a través de cualquier medio de transporte sin límite alguno, logrando la facilidad de distribución y disminución de contacto en el traslado de los pedidos, pero lo mejor es que recibirá ganancias por su trabajo.";
const parrafoAdministrador =
  "Este es un proyecto de innovación construido como proyecto de grado de la autora Karol Giseth Acuña Hernandez , quien con su intención de contribuir a la población campesina dolientes por temas como la economía , la brecha social , riesgos de contagio en épocas de covid, construyó un aplicativo web para la facilidad de distribución de sus productos que hacen parte de la canasta familiar.";

export const Home = () => {
  const sesion = useSelector((store) => store.sesion.array);
  return (
    <div
      className="min-h-screen grid-cols-3 overflow-scroll sm:grid bg-green-50"
      style={{ backgroundImage: `url(${background})` }}
    >
      {sesion.rol === "transportador"}
      {sesion.rol === "administrador"}
      <div className="sm:col-span-1">
        <h2 className="pt-3 mb-0 font-serif text-6xl font-bold text-center">
          ¡Bienvenido!
        </h2>
        <p className="text-2xl text-center">MercaApp Campesino.</p>

        <img
          className="m-auto duration-200 "
          src={
            sesion.rol === "comprador"
              ? comprador
              : sesion.rol === "vendedor"
              ? vendedor
              : sesion.rol === "transportador"
              ? transportador
              : logo
          }
          alt="logo comprador"
        />
      </div>
      <div className="pt-6 pb-16 sm:col-span-2">
        <h2 className="text-xl italic text-center sm:text-2xl">
          {sesion.rol === "vendedor"
            ? "Campesino"
            : sesion.rol === "comprador"
            ? "Comprador"
            : sesion.rol === "transportador"
            ? "Transportador"
            : "Administrador"}
        </h2>
        <p className="sm:px-16 sm:text-lg">
          {sesion.rol === "comprador"
            ? parrafoComprador
            : sesion.rol === "vendedor"
            ? parrafoVendedor
            : sesion.rol === "transportador"
            ? parrafoTransportador
            : parrafoAdministrador}
        </p>
      </div>
    </div>
  );
};
