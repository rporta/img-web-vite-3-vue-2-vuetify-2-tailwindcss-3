# Base Web

> Se requiere: npm 8.5.0, node v16.14.2

## img-web-vite-3-vue-2-vuetify-2-tailwindcss-3.zip

Base Web desglose (dependencies, dev-dependencies):

dependencies: 
```
{
    "@vueuse/core": "^8.7.5",
    "animated-number-vue": "^1.0.0",
    "aos": "^3.0.0-beta.6",
    "axios": "^0.27.2",
    "date-fns": "^2.12.0",
    "portal-vue": "^2.1.7",
    "v-mask": "^2.2.2",
    "vee-validate": "3.4.14",
    "vue": "^2.7.8",
    "vue-carousel": "^0.18.0",
    "vue-cookies-ts": "^1.5.19",
    "vue-lazyload": "^1.3.3",
    "vue-meta": "^2.4.0",
    "vue-router": "^3.5.4",
    "vue-youtube-embed": "^2.2.2",
    "vuetify": "^2.6.7",
    "vuex": "^3.6.2",
    "vuex-i18n": "^1.13.1",
    "vuex-persist": "^2.1.0"
}
```
dev-dependencies: 
```
  "devDependencies": {
    "@babel/eslint-parser": "^7.18.9",
    "@iconify/iconify": "^2.2.1",
    "@iconify/json": "^2.1.84",
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/line-clamp": "^0.4.4",
    "@tailwindcss/typography": "^0.5.13",
    "@types/node": "^18.11.19",
    "@vitejs/plugin-vue2": "^1.1.2",
    "@vue/babel-preset-app": "^5.0.8",
    "@vue/eslint-config-airbnb": "^6.0.0",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.20.0",
    "eslint-plugin-vue": "^9.9.0",
    "postcss": "^8.4.38",
    "sass": "1.32.12",
    "tailwindcss": "^3.4.3",
    "unplugin-vue-components": "^0.21.2",
    "vite": "^3.0.3",
    "vite-plugin-generate-file": "^0.0.3",
    "vite-plugin-prerender": "^1.0.8",
    "vite-plugin-purge-icons": "^0.8.2"
  }
```

---

# Lista de componentes UI-KIT (Global)

Lista:

- absolute->wrapper->slot: Por defecto absulute toma el 100x100 (x, y) y + 1 Z,
- wrapper->slot: habilita flex
- app->wrapper->slot: debe aceptar un color de fondo y un color de letra (cargado del store colorPage)
- navbar->wrapper->slot: debe aceptar un color de fondo y un color de letra (cargado del store colorPage)
- container->wrapper-slot: debe crecer conforme a lo que se le cargue, para que funcione el scroll
- page->container->slot: habilita scroll en Y, hidden scroll X, debe tener el 100 % (x, y)
- section->wrapper->slot:  
- row->wrapper->slot
- col->wrapper->slot

---

# Lista de componentes creados para la aplicacion

component:page: Ligado al router link, es la Pagina se carga en pages folderd, debe aceptar un color de fondo y un color de letra (seteado en el store colorPage: computada con get y set)

component:section: Es la seccion especializada del un component, Se cargan en sections folderd

---

# Estructura de una app a nivel componentes

```
app
    component: navbar/componentNavbar.vue
        navbar
            row
                section
                    col
                        wrapper
    v-windows: aplicar calc height: 100% - (ref: store->module->navbar->props->background)
        v-window
            router-view

                component: page/componentNamePage.vue
                    page
                        component: section/componentNameSection.vue
                            section
                                row
                                    col
                                        wrapper
```

---

# Estructura de el store

```
store
    module:
        app: {
            mobile: boolean
            background: (ref: store->module->page->props->background)
        }

        navbar: {
            enabled: boolean
            props: props() del componente
            component: component
            height, string
        }

        page: {
            props: props(background) del componente
            component: component
        }

        api: {
            loading: boolean, cuando se pide una api esta se activa en true y cuado termina se aplica en false
            ^ Se puede usar para bloquear intraccion del usuario y mostrar un spiner (tipo loading)
            ^ Se podria usar para bloquear campos en formularios
        }
```             
# Estructura de carpetas

```
@: src
    assets
        docs
        js
        json
        scss
    lang
        multi:
            codeLang.js: codeLang es el codigo de pais de 2 letras
    navbar: componentNavbar.vue
    config: configName.json*
    page: componentNamePage.vue*
    section: componentNameSection.vue*
    plugins:
        custom-plugins: pluginName.js
    store
        modules
```

# Archivo global de configuracion (`configApp.json`)

| clave               | descripcion                                                    |
|---------------------|----------------------------------------------------------------|
| language.default    | Es el codigo de pais (de 2 caracteres) ejemplo  `es`           |
| app.id              | Es el id de la app, elemplo `com.[org].[nameApp]`              |
| app.name            | Es el nombre de la app                                         |
| app.description     | Es la descripcion de la app                                    |
| author              | Es un arreglo de autores: `{ name: string, lastName: string }` |
| assets.icon         | Es el icono de la app                                          |
| assets.splash       | Es la imagen de fondo de la app en proceso de carga (android)  |
| assets.animatedIcon | Es el icono animado en proceso de carga (android)              |

Plantilla del archivo de configuracion (`configApp.json`)

```
{
    "language": {
        "default": ""
    },
    "app": {
        "id": "",
        "name": "",
        "description": ""
    },
    "author": [
        {
            "name": "",
            "lastName": ""
        },
    ],
    "assets": {
        "icon": "",
        "splash": "",
        "animatedIcon": ""
    }
}
```

---

# Configuracion de archivo de entorno (`.env`)

Dentro del archivo (.env), definir las sguientes variables de entorno

- VITE_APP_NAME: String // Es el nombre de la app
- VITE_APP_SLOGAN: String // Es el slogan (descripcion corta) de la app 

---

# Configuracion de los archivos (`package.json, package-lock.json`)

Dentro de los archivos(`package.json, package-lock.json`), 
buscar `img-web-vite-3-vue-2-vuetify-2-tailwindcss-3` y reemplazar 
con el nombre de nuestra app

---

## Mejoras

1) En App en template ya hay algunas mejoras definidas implementarlas