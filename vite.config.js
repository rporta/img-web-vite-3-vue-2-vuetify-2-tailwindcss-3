import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue2';
import PurgeIcons from 'vite-plugin-purge-icons';
import Components from 'unplugin-vue-components/vite';
import vitePrerender from 'vite-plugin-prerender';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import { resolve, join } from 'path';
import { createKey } from './src/assets/js/helpers';

export default async ({ mode }) => {
    // Cargamos las .env[mode], a process.env
    process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

    const keyCryptr = createKey(20);

    return defineConfig({
        server: {
            port: process.env.VITE_PORT,
        },
        plugins: [
            Vue(),
            PurgeIcons(),
            Components({
                resolvers: [
                    VuetifyResolver(),
                ],
                dirs: [
                    'src/common/components/ui-kit',
                ],
            }),
            // vitePrerender({
            //     staticDir: join(__dirname, 'dist'),
            //     outputDir: join(__dirname, 'dist'),
            //     // Required - Routes to render.
            //     routes: ['/', '/home'],

            //     postProcess(renderedRoute) {
            //         // eslint-disable-next-line no-param-reassign
            //         renderedRoute.html = renderedRoute.html.replace('id="app"', 'id="app" data-server-rendered="true"');
            //         return renderedRoute;
            //     },
            // }),
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
        define: {
            'import.meta.env.VITE_BUILD_TIMESTAMP': JSON.stringify(Date.now().toString()),
            'import.meta.env.VITE_KEY_CRYPTR': JSON.stringify(keyCryptr), // Genera la key para dependencia t-cryptr
        },
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: [
                        '@import "./src/assets/scss/vuetify/variables"',
                        '',
                    ].join('\n'),
                },
            },
        },
    });
};
