import logo from "../assets/logoCarrizo.jpg";
import header from "../assets/tijeras1.webp"
import AOS from "aos";
import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 }); // Inicializa AOS con una duración de 2 segundos
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center xl:h-[300px] xs:h-[300px] p-5 w-full">
      {/* Capa de imagen de fondo con opacidad */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${header})`, // Usa la imagen como fondo
          backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
          backgroundPosition: "center", // Centra la imagen
          opacity: 0.5, // Aplica opacidad del 50%
          zIndex: -1, // Coloca la capa detrás del contenido
        }}
      ></div>

      {/* Contenedor para centrar logo y texto */}
      <div className="flex flex-col items-center justify-center text-center relative">
        {/* Contenido del logo por encima del header */}
        <div className="overflow-hidden flex items-center justify-center shadow-lg rounded-full">
          <img
            src={logo}
            alt="logo El circulo"
            className="w-full h-full object-cover border border-white rounded-full"
          />
        </div>
        <h1 data-aos="fade-up" className="my-2 text-3xl text-white">
          Mauricio Carrizo
        </h1>

        {/* Texto debajo del logo */}
        <h2 className="my-2 text-xl font-light text-white">Selecciona una fecha</h2>
      </div>
    </div>
  );
};

export default Hero;
