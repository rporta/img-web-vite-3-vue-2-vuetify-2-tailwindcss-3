import Vue from 'vue';
import { mixinGlobal } from '../../common/mixins';
import api from './api';
import mockup from './mockup';
import i18n from './i18n';

Vue.mixin(mixinGlobal);
Vue.use(api);
Vue.use(mockup);
Vue.use(i18n);
