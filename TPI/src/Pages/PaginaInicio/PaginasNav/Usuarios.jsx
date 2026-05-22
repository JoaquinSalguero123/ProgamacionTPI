import CardUsuario from '../../../components/common/CardUsuario'

const usuarios = [
  { nombre_apellido: 'Juan Pérez',     email: 'juan.perez@gmail.com',     password: '12323',     tipo: 0, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { nombre_apellido: 'Joaquín Gómez',  email: 'joaquin.gomez@gmail.com',  password: 'ASDDG4W13', tipo: 1, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { nombre_apellido: 'Agustín López',  email: 'agustin.lopez@gmail.com',  password: '32432423',  tipo: 2, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { nombre_apellido: 'Marta Sánchez',  email: 'marta.sanchez@gmail.com',  password: '1234',      tipo: 2, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { nombre_apellido: 'Lucía Fernández',email: 'lucia.fernandez@gmail.com',password: 'ASD1234',   tipo: 1, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { nombre_apellido: 'Valentina Ruiz', email: 'valentina.ruiz@gmail.com', password: 'ASD1234',   tipo: 0, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
];

const UsuariosPage = () => {
  return (
    <>
      {usuarios.map((usuario, index) => (
        <CardUsuario 
          key={index}
          nombre={usuario.nombre_apellido}
          email={usuario.email}
          password={usuario.password}
          tipo={usuario.tipo}
          cortes={usuario.cortes}
        />
      ))}
    </>
  )
}

export default UsuariosPage;