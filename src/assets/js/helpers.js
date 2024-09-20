let html;
let body;

try {

    html = document.querySelector('html');
    body = document.querySelector('body');

} catch {
    // No existe document
}

export function priceFormatting(p, fractionDigits = 2) {
    if (typeof p === 'undefined' || p === null) {
        return p;
    }
    // Si el número tiene decimales lo forzamos que siempre represente 2 dígitos
    const options = Number(p) % 1 !== 0 ? { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits } : {};
    return Number(p).toLocaleString('de-DE', options);
}

// Convierte un color en formato hex (Normal: #ffffff) o (Reducido: #fff) a rgb '255,255,255'
export function hexToRgb(hex) {
    return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
        .join();
}

export function capitalize(s) {
    if (typeof s === 'string') {
        return s.toLowerCase().split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(' ');
    }
    return s;
}

/**
 * [createKey description] Genera una clave alfanumerica
 * @param  {Number} length [description] Longitud de la clave a generar
 * @return {String}        [description] Clave generada EJ: 'azT8u'
 */
export function createKey(length) {
    const ABC = [...Array(26).keys()].map((i) => String.fromCharCode(i + 97).toUpperCase());
    const Numbers = [...Array(10).keys()];
    const charList = [
        ...ABC,
        ...ABC.map(i => i.toLowerCase()),
        ...Numbers,
    ].join('');
    const createRandomChar = () => charList.charAt(Math.floor(Math.random() * charList.length));
    // eslint-disable-next-line
    return [...Array(length).keys()].reduce((aux) => (aux += createRandomChar()), '');
}

/**
 * [defaultThen description]
 * @param  {Promise} service            [description] Debe una promesa que contenga un RQ a un servicio
 * @param  {Boolean} options.applyParse [description] Si se establece en true, intentara hacer el parseo de la rs;
 * @return {Promise}                    [description] Retorna una promesa
 */
export function defaultThen(service, { applyParse }) {
    // eslint-disable-next-line no-confusing-arrow
    return service.then(({ data }) => applyParse ? { data: JSON.parse(data) } : { data });
}

/**
 * [camelCaseToSlash description] Este metodo es util para convertir de 'apiPepeAsd' a 'api/pepe/asd'
 * @param  {String} camelCase [description] Es un string al estilo camelCase
 * @return {String}           [description] Retorna el string camelCase, procesado
 */
export function camelCaseToSlash(camelCase) {

    const processing = camelCase.match(/./g).reduce((aux, char) => {
        if (char === char.toLowerCase()) {
            /* eslint-disable */
            aux.words += aux.charUpperCase + char;
            aux.charUpperCase = '';
            /* eslint-enable */
        } else {
            aux.out.push(aux.words);
            /* eslint-disable */
            aux.words = '';
            aux.charUpperCase = char;
           /* eslint-enable */
        }
        return aux;
    }, { out: [], charUpperCase: '', words: '' });

    processing.out.push(processing.words);

    return processing.out.join('/').toLowerCase();
}

/**
 * [slashToCamelCase description] Este metodo es util para convertir de 'api/pepe/asd' a 'apiPepeAsd'
 * @param  {String} slash [description] Es un string con slash Ej: 'api/pepe/asd'
 * @return {String}       [description] Retorna el string con slash, procesado
 */
export function slashToCamelCase(slash) {
    return slash.split('/').join('');
}
