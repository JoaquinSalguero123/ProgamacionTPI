import { useEffect, useState } from "react";
import CardTurno from "../../../components/common/CardTurno";
/* 
const turnos = [
  { fecha: '10/03/2027', importe: 14000, servicio: "Peinado de cola", estado: "Pendiente", estilista: "Joaquin Salguero"},
  { fecha: '12/03/2027', importe: 20000, servicio: "Corte de pelo y perfilado de barba", estado: "Aprobado", estilista: "Federico Gomez"},
  { fecha: '15/03/2027', importe: 18000, servicio: "Coloración y tratamiento capilar", estado: "Rechazado", estilista: "Lucia Fernandez"},
  { fecha: '18/03/2027', importe: 22000, servicio: "Alisado brasileño", estado: "Aprobado", estilista: "Sofia Martinez"},
  { fecha: '20/03/2027', importe: 16000, servicio: "Corte de cabello para niños", estado: "Pendiente", estilista: "Diego Ramirez"},
  { fecha: '22/03/2027', importe: 25000, servicio: "Tratamiento de keratina", estado: "Aprobado", estilista: "Valentina Lopez"},
  { fecha: '25/03/2027', importe: 19000, servicio: "Peinado para eventos especiales", estado: "Rechazado", estilista: "Matias Gonzalez"},
];
*/



const TurnosPage = () => {

  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
      fetch("http://localhost:3000/turnos")
        .then(res => res.json())
        .then(data => setTurnos(data))
        .catch(error => console.error(error));
    }, []);

  return (
    <>
    {turnos.map((turno, importe) => (
          <CardTurno 
            key={turno.id}   
            fecha={turno.fecha}
            hora_turno={turno.hora_turno}
            email_cliente={turno.email_cliente}
            id_servicio={turno.id_servicio}
            email_estilista={turno.email_estilista}
            estado={turno.estado}
          />
        ))}
    </>
  )
}

export default TurnosPage;