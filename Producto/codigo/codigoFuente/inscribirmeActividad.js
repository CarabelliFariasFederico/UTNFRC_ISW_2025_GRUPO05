export function inscribirmeActividad(actividad, datos) {
  const { horario, participantes, aceptarTerminos } = datos;

  if (!actividad.horarios[horario]) {
    return 'Horario inválido';
  }

  if (actividad.horarios[horario] < participantes.length) {
    return 'No hay cupos para el horario seleccionado';
  }

  if (!aceptarTerminos) {
    return 'Debe aceptar los términos y condiciones';
  }

  for (const p of participantes) {
    if (!p.nombre || !p.dni || !p.edad) {
      return 'Faltan datos del participante';
    }

    if (actividad.requiereVestimenta && !p.tallaVestimenta) {
      return 'Falta la talla de vestimenta requerida';
    }
  }

  actividad.horarios[horario] -= participantes.length;
  return 'Inscripción exitosa';
}
