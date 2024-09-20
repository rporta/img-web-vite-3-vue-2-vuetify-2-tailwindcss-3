import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import es from 'vee-validate/dist/locale/es.json';
import {
    required,
    min,
    max,
    digits,
    numeric,
    confirmed,
    email,
} from 'vee-validate/dist/rules';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

extend('required', { ...required, message: es.messages.required });
extend('min', { ...min, message: es.messages.min });
extend('max', { ...max, message: es.messages.max });
extend('digits', { ...digits, message: es.messages.digits });
extend('numeric', { ...numeric, message: es.messages.numeric });
extend('confirmed', { ...confirmed, message: es.messages.confirmed });
extend('email', { ...email, message: es.messages.email });

// Reglas personalizadas

// Valida que la password ingresada tenga 10 caracteres alfanuméricos mínimos, que contengan al menos 1 número, una letra mayúscula, una letra minúsculas y un caracter especial
extend('passwordRules', {
    validate: (val) => {
        const hasUpperCase = /[A-Z|Á|É|Í|Ó|Ú|Ñ]/.test(val); // Boolean: true si tiene 1 caracter en mayúsculas
        const hasLowerCase = /[a-z|á|é|í|ó|ú|ñ]/.test(val); // Boolean: true si tiene 1 caracter en minúsculas
        // Caracter especial:   ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _` { | } ~
        const hasSpecialChar = /!|"|#|\$|%|'|\(|\)|\*|\+|,|-|\.|\/|:|;|<|=|>|\?|@|\[|\]|\^|_|`|{|}|~/.test(val); // Boolean: true si tiene 1 caracter especial
        const hasNumber = /\d/.test(val); // Boolean: true si tiene 1 digito 0 a 9
        const hasMinChar = /.{10}/.test(val); // Boolean: true si tiene 10 caracteres
        return hasUpperCase && hasLowerCase && hasSpecialChar
        && hasNumber && hasMinChar;
    },
    message: (fieldName, placeholders) => {
        const val = placeholders._value_;

        const hasUpperCase = /[A-Z|Á|É|Í|Ó|Ú|Ñ]/.test(val); // Boolean: true si tiene 1 caracter en mayúsculas
        const hasLowerCase = /[a-z|á|é|í|ó|ú|ñ]/.test(val); // Boolean: true si tiene 1 caracter en minúsculas
        // Caracter especial:   ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _` { | } ~
        const hasSpecialChar = /!|"|#|\$|%|'|\(|\)|\*|\+|,|-|\.|\/|:|;|<|=|>|\?|@|\[|\]|\^|_|`|{|}|~/.test(val); // Boolean: true si tiene 1 caracter especial
        const hasNumber = /\d/.test(val); // Boolean: true si tiene 1 digito 0 a 9
        const hasMinChar = /.{10}/.test(val); // Boolean: true si tiene 10 caracteres

        if (!hasUpperCase) {
            return 'La contraseña debe tener al menos una letra mayúscula';
        } else if (!hasLowerCase) {
            return 'La contraseña debe tener al menos una letra minúsculas';
        } else if (!hasSpecialChar) {
            return 'La contraseña debe tener al menos un carácter especial';
        } else if (!hasNumber) {
            return 'La contraseña debe tener al menos un número';
        } else if (!hasMinChar) {
            return 'La contraseña debe tener al menos diez caracteres alfanuméricos';
        }
    },
});

// Validación para password de T-Phone, solo caracteres alfanuméricos y ningún caracter especial.
extend('tphonePasswordRules', {
    validate: v => /^([a-zA-Z0-9])+$/.test(v) && /[a-zA-Z]/.test(v) && /\d/.test(v),
    message: 'La contraseña debe tener al menos una letra y un número',
});

// Valida que la password ingresada no tenga ni espacios ni caracteres vacíos (alt + 0160)
extend('passwordNoSpacesRule', {
    validate: (val) => {
        const valNoSpaces = val.replace(RegExp('\x20|\xA0', 'g'), ''); // Quita espacios y (alt + 0160)
        return val.length === valNoSpaces.length;
    },
    message: 'La contraseña no es válida',
});

// Valida la aceptación de términos y condiciones
extend('requiredCheckboxTrue', {
    validate: val => val,
    message: 'Es necesario que aceptes los términos y condiciones',
});

// Valida la longitud del número telefónico que siempre tiene que ser (CodArea + Num = 11 | No se cuenta el 15)
extend('phoneLength', {
    params: ['areaCode'],
    validate: (value, { areaCode }) => (areaCode && value ? areaCode.length + value.length === 11 : null),
    message: (fieldName, placeholders) => (placeholders.areaCode ? `El número telefónico debe ser de ${11 - placeholders.areaCode.length} dígitos` : 'Número telefónico incorrecto'),
});

// Prohíbe ciertos números telefónicos que inician con determinado valor
const forbiddenNumbers = [
    '00000000',
    '11111111',
    '22222222',
    '33333333',
    '44444444',
    '55555555',
    '66666666',
    '77777777',
    '88888888',
    '99999999',
    '12345678',
    '10000000',
    '20000000',
    '30000000',
    '40000000',
    '50000000',
    '60000000',
    '70000000',
    '80000000',
];
const forbiddenNumbersByAreaCode = [{
    areaCode: '011',
    numbers: ['15', '11', '011', '911', '0000', '1111', '5555', '8888', '9999', '1010'],
}];
extend('forbiddenNumbers', {
    params: ['areaCode'],
    validate: (value, { areaCode }) => {
        if (forbiddenNumbers.find(a => a.startsWith(value))) {
            return false;
        }
        const areaCodeMatched = forbiddenNumbersByAreaCode.find(a => a.areaCode === areaCode);
        if (areaCodeMatched) {
            return !areaCodeMatched.numbers.find(a => value.startsWith(a));
        }
        return true;
    },
    message: () => 'El número ingresado es incorrecto',
});
