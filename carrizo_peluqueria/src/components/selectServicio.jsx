import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import barba from '../assets/barba.jpeg';
import corte from '../assets/corte.jpeg';
import color from '../assets/color.jpg';

const SelectServicio = ({ onTotalChange, onServiciosChange }) => {
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]); // Guardar solo los nombres de los servicios seleccionados
  const [total, setTotal] = useState(0);

  const servicios = [
    { 
      nombre: 'Corte', 
      img: corte,  
      precio: '$12.000', 
      valor: 20000 
    },
    { 
      nombre: 'Barba', 
      img: barba,  
      precio: '$15.000', 
      valor: 15000 
    },
    { 
      nombre: 'Coloración', 
      img: color,  
      precio: '$30.000', 
      valor: 30000 
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleServicioClick = (servicio, checked) => {
    let nuevosServicios = [];
    let nuevoTotal = total;

    if (checked) {
      // Añadir solo el nombre del servicio al array de seleccionados
      nuevosServicios = [...serviciosSeleccionados, servicio.nombre];
      nuevoTotal += servicio.valor;
    } else {
      // Eliminar el nombre del servicio del array de seleccionados
      nuevosServicios = serviciosSeleccionados.filter(nombre => nombre !== servicio.nombre);
      nuevoTotal -= servicio.valor;
    }

    setServiciosSeleccionados(nuevosServicios);
    setTotal(nuevoTotal);

    // Enviar el total actualizado y los servicios seleccionados al componente padre
    onTotalChange(nuevoTotal);
    onServiciosChange(nuevosServicios);
  };

  return (
    <div className="mb-4 xl:w-[500px] lg:w-[500px]">
      <div className="flex flex-wrap gap-4 justify-center">
        {servicios.map((servicio) => (
          <div
            key={servicio.nombre}
            className="border rounded-lg w-[300px] h-[100px] flex items-center bg-zinc-800 text-white cursor-pointer transition-transform duration-300 transform hover:scale-105"
            data-aos="fade-up"
          >
            <img 
              src={servicio.img} 
              alt={servicio.nombre} 
              className="w-[100px] h-full object-cover rounded-l-lg"
            />
            <div className="flex flex-col justify-center pl-4 flex-grow">
              <h4 className="text-lg font-bold">{servicio.nombre}</h4>
              <p className="text-gray-300">{servicio.precio}</p>
            </div>
            <div className="pr-4">
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-500 checked:border-green-500"
                    onChange={(e) => handleServicioClick(servicio, e.target.checked)}
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla de servicios seleccionados */}
      <div className="mt-6 w-full">
        <h3 className="text-white text-lg font-semibold mb-4 text-center">Servicios Seleccionados:</h3>
        <table className="table-auto w-full text-white">
          <thead>
            <tr>
              <th className="text-left p-3">Servicio</th>
            </tr>
          </thead>
          <tbody>
            {serviciosSeleccionados.map((nombre, index) => (
              <tr key={index}>
                <td className="border-b p-3">{nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Total */}
        <div className="mt-4 text-right text-white font-semibold">
          Total: ${total.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default SelectServicio;
