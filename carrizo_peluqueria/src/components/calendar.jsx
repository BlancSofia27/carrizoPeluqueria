import { React, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale'; // Importar la localización en español
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css'; // Importa tu CSS personalizado

// Registra la localización en español y la establece como predeterminada
registerLocale('es', es);

const Calendario = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Función para desactivar días anteriores y domingos
  const isDateDisabled = (date) => {
    const today = new Date();
    // Desactivar días anteriores y domingos (0)
    return date < today.setHours(0, 0, 0, 0) || date.getDay() === 0;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date); // Enviar la fecha seleccionada al componente padre
  };

  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange} // Usa la nueva función para manejar el cambio de fecha
        inline // Muestra solo el calendario
        filterDate={(date) => !isDateDisabled(date)} // Desactivar fechas
        locale="es" // Establece la localización en español
      />
    </div>
  );
};

export default Calendario;
