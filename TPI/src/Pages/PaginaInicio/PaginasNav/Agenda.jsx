import { useEffect, useState } from "react";
import CardTurno from "../../../components/common/CardTurno";



const TurnosPage = () => {

  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
      fetch("http://localhost:3000/turnos",{
        headers: {
          "Authorization" : ` Bearer ${localStorage.getItem("Token")} `
        }
      })
        .then(res => res.json())
        .then(data => setTurnos(data))
        .catch(error => console.error(error));
    }, []);

  return (
    <>
    {turnos.map((turno) => (
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