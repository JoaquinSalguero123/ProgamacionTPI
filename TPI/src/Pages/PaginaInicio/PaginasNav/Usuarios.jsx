import CardUsuario from '../../../components/common/CardUsuario'

const usuarios = [
  { email: 'JUAN', password: '12323', tipo: 0, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { email: 'JOAQUI', password: 'ASDDG4W13', tipo: 1, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { email: 'AGUS', password: '32432423', tipo: 2, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { email: 'MARTA', password: '1234', tipo: 2, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { email: 'LUCIA', password: 'ASD1234', tipo: 1, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { email: 'VALEN', password: 'ASD1234', tipo: 0, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
]

const UsuariosPage = () => {
  return (
    <>
      {usuarios.map((usuario, index) => (
        <CardUsuario 
          key={index}
          nombre={usuario.email}
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