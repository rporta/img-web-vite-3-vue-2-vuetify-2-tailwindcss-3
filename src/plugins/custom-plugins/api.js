import axios from 'axios';
import store from '../../store/store';

export default {

    install(Vue) {

        /* DATOS ESPERADOS:

        (Obligatorio)   url: 'usuarios' | `usuarios/:id`                - URL de la API
        (Opcional)      method: get (Default) | post | put | delete     - Método HTTP
        (Opcional)      upload: true | false                            - Define si se realiza el envío de un formdata
        (Opcional)      headers: { Key: Value, }                        - Headers personalizados
        (Opcional)      data: { Key: Value, }                           - Datos que se envían en el cuerpo de la petición
        (Opcional)      params: { Key: Value, }                         - Parametros de la petición
        (Opcional)      timeout: Number                                 - Duración de espera de respuesta de la petición antes de fallar
        (Opcional)      auth: Boolean                                   - Define si la petición adjunta las cookie 'Authorization' al header de la petición
        (Opcional)      authCookie: String                              - Nombre de la cookie JWT a enviar con el header 'Authorization'
        (Opcional)      backend: true | false (Default)                 - Define si la petición se hace al Back-End o al CRM

        *************************************** */

        // Creación de los headers de la petición
        function headersSetter(headers, upload, auth, authCookie) {

            let headersTemp = headers;

            if (auth) {
                const cookieJwt = Vue.cookies.get(authCookie);
                headersTemp = Object.assign(headersTemp, { Authorization: `Bearer ${cookieJwt}` });
            }

            return upload ? Object.assign(headersTemp, { 'Content-Type': 'multipart/form-data' }) : headersTemp;
        }

        // Manejo de las respuestas de error
        async function responseHandler(err, authCookie) {

            /* if (import.meta.env.DEV) {
                console.warn('-- API ERROR --');
                console.log(err.response);
            } */

            if (err.response?.status === 400) {
                return Promise.reject(err);
            }

            return err;
        }

        const api = args => new Promise((resolve, reject) => {

            const {
                url,
                method = 'get',
                upload = false,
                headers = {},
                data,
                params,
                timeout = import.meta.env.VITE_AXIOS_TIMEOUT,
                auth,
                authCookie = 'jwt',
                backend = false,
            } = (typeof args === 'string') ? { url: args } : args;

            // Método HTTP
            if (!['get', 'post', 'put', 'delete'].includes(method)) {
                reject(new Error('Método HTTP incorrecto'));
            }

            // Seteo los estados de carga y guardado
            if (['post', 'put'].includes(method)) {
                store.dispatch('app/saving', true);
            } else {
                store.dispatch('app/loading', true);
            }

            axios.interceptors.response.use(resp => resp, err => responseHandler(err, authCookie));

            let serverUrl = '';

            axios({
                method,
                url: `${serverUrl}${url}`,
                headers: headersSetter(headers, upload, auth, authCookie),
                timeout: (upload && data.filesToUpload) ? (data.filesToUpload * 10000) : timeout,
                data,
                params,
            })
                .then(resp => resolve(resp.data))
                .catch(err => reject(new Error(responseHandler(err, authCookie))))
                .finally(() => {
                    store.dispatch('app/loading', false);
                    store.dispatch('app/saving', false);
                });
        });

        /* eslint-disable no-param-reassign */
        Vue.prototype.$api = api;
        /* eslint-enable no-param-reassign */
    },
};
