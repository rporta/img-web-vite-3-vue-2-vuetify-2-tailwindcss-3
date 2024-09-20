import { format, parseISO } from 'date-fns';

const now = parseISO(new Date().toISOString());
const { now: dateNow } = {
    now: format(now, 'MM/dd/yyyy HH:mm'),
};

/**
 * [throwControllerInTime description] Metodo para ejecutar lista de manejadores de acuerdo objeto times
 * @param  {Object} times          [description] Se requiere objeto(times). Ej: {etapa1: '02/06/2023 00:00', etapa2: '02/22/2023 00:00'}
 * @param  {Object} handlers       [description] Se requiere objeto(handlers). Ej: {etapa1: Function, etapa2: Function}
 * @param  {Object} defaultHandler [description] Opcional, en caso de que no se de ninguna key del objeto(times), entonces se ejecutara este manejador
 * @return {void}                  [description] Ejecuta los manejadores en los tiempos definidos, o el manejador por defecto
 */
function throwControllerInTime(times, handlers, defaultHandler = null) {

    const timesInt = {};
    const hasTimes = {};
    const timesKeys = Object.keys(times);

    let timeKey = null;

    timesKeys.forEach((key) => {
        timesInt[key] = Date.parse(times[key]);
        hasTimes[key] = Date.parse(dateNow) >= timesInt[key];
        if (hasTimes[key]) {
            timeKey = key;
        }
    });

    if (timeKey) {
        // Ejecutamos el manejador correspondiente
        handlers[timeKey]();
    } else if (defaultHandler) {
        // Ejecutamos el manejador por defecto
        defaultHandler();
    }
}

export {
    dateNow,
    throwControllerInTime,
};
