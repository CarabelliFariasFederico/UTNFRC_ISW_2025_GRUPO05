import { inscribirmeActividad } from "./inscribirmeActividad";

const assert = require('assert');

describe('inscribirmeActividad()', () => {
  it('debe permitir inscribirse con todos los datos válidos y aceptar términos', () => {
    const actividad = {
      nombre: 'Tirolesa',
      horarios: {
        '10:00': 5,
        '11:00': 0
      },
      requiereVestimenta: true
    };

    const datos = {
      horario: '10:00',
      participantes: [
        {
          nombre: 'Ana',
          dni: '12345678',
          edad: 25,
          tallaVestimenta: 'M'
        }
      ],
      aceptarTerminos: true
    };

    const resultado = inscribirmeActividad(actividad, datos);
    assert.equal(resultado, 'Inscripción exitosa');
  });

  it('falla si no hay cupo en el horario seleccionado', () => {
    const actividad = {
      nombre: 'Tirolesa',
      horarios: {
        '11:00': 0
      },
      requiereVestimenta: true
    };

    const datos = {
      horario: '11:00',
      participantes: [
        {
          nombre: 'Juan',
          dni: '87654321',
          edad: 30,
          tallaVestimenta: 'L'
        }
      ],
      aceptarTerminos: true
    };

    const resultado = inscribirmeActividad(actividad, datos);
    assert.equal(resultado, 'No hay cupos para el horario seleccionado');
  });

  it('falla si no acepta términos y condiciones', () => {
    const actividad = {
      nombre: 'Safari',
      horarios: {
        '09:00': 2
      },
      requiereVestimenta: false
    };

    const datos = {
      horario: '09:00',
      participantes: [
        {
          nombre: 'Laura',
          dni: '11223344',
          edad: 28
        }
      ],
      aceptarTerminos: false
    };

    const resultado = inscribirmeActividad(actividad, datos);
    assert.equal(resultado, 'Debe aceptar los términos y condiciones');
  });

  it('falla si falta la talla de vestimenta cuando se requiere', () => {
    const actividad = {
      nombre: 'Palestra',
      horarios: {
        '14:00': 3
      },
      requiereVestimenta: true
    };

    const datos = {
      horario: '14:00',
      participantes: [
        {
          nombre: 'Mario',
          dni: '33445566',
          edad: 22
          // falta tallaVestimenta
        }
      ],
      aceptarTerminos: true
    };

    const resultado = inscribirmeActividad(actividad, datos);
    assert.equal(resultado, 'Falta la talla de vestimenta requerida');
  });
});