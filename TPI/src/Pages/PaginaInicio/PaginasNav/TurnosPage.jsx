import CardTurno from "../../../components/common/CardTurno";

const turnos = [
  { fecha: '10/03/2027', importe: 14000, servicio: "Peinado de cola", estado: "Pendiente", estilista: "Joaquin Salguero"},
  { fecha: '12/03/2027', importe: 20000, servicio: "Corte de pelo y perfilado de barba", estado: "Aprobado", estilista: "Federico Gomez"},
  { fecha: '15/03/2027', importe: 18000, servicio: "Coloración y tratamiento capilar", estado: "Rechazado", estilista: "Lucia Fernandez"},
  { fecha: '18/03/2027', importe: 22000, servicio: "Alisado brasileño", estado: "Aprobado", estilista: "Sofia Martinez"},
  { fecha: '20/03/2027', importe: 16000, servicio: "Corte de cabello para niños", estado: "Pendiente", estilista: "Diego Ramirez"},
  { fecha: '22/03/2027', importe: 25000, servicio: "Tratamiento de keratina", estado: "Aprobado", estilista: "Valentina Lopez"},
  { fecha: '25/03/2027', importe: 19000, servicio: "Peinado para eventos especiales", estado: "Rechazado", estilista: "Matias Gonzalez"},
];

const TurnosPage = () => {
  return (
    <>
    {turnos.map((turno, index) => (
          <CardTurno 
            key={index}   
            fecha={turno.fecha}
            importe={turno.importe}
            servicio={turno.servicio}
            estado={turno.estado}
            estilista={turno.estilista}
          />
        ))};
    </>
  )
}

export default TurnosPage;