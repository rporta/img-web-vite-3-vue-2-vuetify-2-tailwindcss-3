/*
    Ejemplos de usos funcion mockup(data, opciones):

        - Si queremos simular que nos contesta un servicio
        await mockup(['4565-7892', '7895-1234']);

        - Si queremos simular que la promesa fallo
        await mockup(null, {reject: true});

        - Si queremos simular un timeout
        await mockup(null, {reject: true, time: 5000});
 */

/**
 * [mockup description]
 * @param  [mix]    data            [description]: Datos que contesta la Promise
 * @param  Object   options.time    [description]: Opcional, tiempo en milisegundos que tarda en contestarse la Promise
                    options.reject  [description]: Opcional, define si la Promise se resolvera como reject
 * @return Promise                  [description]: Objeto Promise de respuesta
 */
function mockup(data = {}, { time: ms = 500, reject: fail = false } = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fail) {
                reject(data);
            }
            resolve(data);
        }, ms);
    });
}

export default {

    install(Vue) {
        // eslint-disable-next-line no-param-reassign
        Vue.prototype.$mockup = mockup;
    },
};
