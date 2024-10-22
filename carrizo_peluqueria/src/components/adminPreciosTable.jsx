import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from "sweetalert2"; // Asegúrate de tener instalado SweetAlert2
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

// Lista de servicios con precios
const servicios = [
  { nombre: "Corte", precio: "$15.000" },
  { nombre: "Barba", precio: "$12.000" },
  { nombre: "Color", precio: "$25.000" },
];

// Horarios disponibles
const horariosDisponibles = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "13:10",
  "16:00",
  "16:20",
  "17:00",
  "17:10",
  "18:00",
  "19:00",
  "19:15",
  "20:00",
  "20:30",
];

const ServiciosTable = () => {
  const [horariosActivos, setHorariosActivos] = useState(horariosDisponibles); // Inicialmente, todos los horarios están activos
  const [nuevoHorario, setNuevoHorario] = useState("");
  const navigate = useNavigate(); // Inicializa navigate

  // Función para manejar el clic en un horario
  const handleHorarioClick = (horario) => {
    if (horariosActivos.includes(horario)) {
      Swal.fire({
        title: "¿Desactivar este horario?",
        text: `¿Quieres desactivar el horario de ${horario}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745", // Color verde para confirmación
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, desactivar",
      }).then((result) => {
        if (result.isConfirmed) {
          setHorariosActivos((prev) => prev.filter((h) => h !== horario)); // Desactiva el horario
          Swal.fire("Desactivado", `El horario de ${horario} ha sido desactivado.`, "success");
        }
      });
    }
  };

  // Función para agregar un nuevo horario
  const agregarHorario = () => {
    if (nuevoHorario && !horariosActivos.includes(nuevoHorario)) {
      setHorariosActivos((prev) => [...prev, nuevoHorario]); // Agrega el nuevo horario
      Swal.fire({
        title: "Nuevo horario agregado",
        text: `Se ha agregado el horario: ${nuevoHorario}`,
        icon: "success",
        confirmButtonColor: "#28a745", // Color verde para el botón "OK"
      });
      setNuevoHorario(""); // Reinicia el campo de nuevo horario
    } else {
      Swal.fire("Error", "El horario ya está activo o no es válido.", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Precios Vigentes</h1>

      {/* Swiper para servicios */}
      <Swiper spaceBetween={20} slidesPerView={1} pagination={{ clickable: true }} loop={true} className="mySwiper w-full">
        {servicios.map((servicio, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-800 border border-gray-700 rounded-lg mb-4 p-4 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-white mb-2">{servicio.nombre}</h2>
              <p className="text-gray-300 text-lg">Precio: {servicio.precio}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Sección de horarios */}
      <div className="flex flex-row items-center mb-4">
        <h2 className="text-xl font-semibold text-white mr-4">Horarios Activos</h2>
        <button
          onClick={() => {
            Swal.fire({
              title: "Agregar nuevo horario",
              input: "text",
              inputLabel: "Formato: 00:00",
              inputPlaceholder: "Ej: 14:30",
              showCancelButton: true,
              confirmButtonText: "Agregar",
              cancelButtonText: "Cancelar",
              preConfirm: (inputHorario) => {
                setNuevoHorario(inputHorario);
                agregarHorario(inputHorario);
              },
            });
          }}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
        >
          Agregar Horario
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full">
        {horariosDisponibles.map((horario) => (
          <button
            key={horario}
            onClick={() => handleHorarioClick(horario)}
            className={`p-3 rounded-lg font-bold ${
              horariosActivos.includes(horario) ? "bg-green-500 text-white" : "bg-gray-600 text-gray-200"
            } transition duration-200`}
          >
            {horario}
          </button>
        ))}
      </div>

      {/* Sección de horarios inactivos */}
      <h3 className="text-lg font-semibold text-white text-center mt-6">Horarios Inactivos</h3>
      <div className="grid grid-cols-4 gap-4 w-full mt-2">
        {horariosDisponibles
          .filter((horario) => !horariosActivos.includes(horario))
          .map((horario) => (
            <button
              key={horario}
              onClick={() => agregarHorario(horario)}
              className="py-2 px-4 rounded-lg font-semibold bg-blue-600 text-white transition duration-200 hover:bg-blue-700"
            >
              {horario}
            </button>
          ))}
      </div>

      {/* Botón para redirigir al panel de administración */}
      <button
        onClick={() => navigate('/adminPanel')} // Redirige a /adminPanel
        className="mt-6 bg-gray-700 text-white p-2 rounded hover:bg-gray-800 transition duration-200"
      >
        Volver al Panel de Administración
      </button>
    </div>
  );
};

export default ServiciosTable;
