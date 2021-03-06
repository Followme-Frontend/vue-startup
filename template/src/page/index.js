// Promise polyfill for webpack2+: https://stackoverflow.com/questions/38960490/how-can-i-polyfill-promise-with-webpack
require('es6-promise').polyfill();

import 'normalize.css';
import 'babel-polyfill';

import Vue from 'vue';
import VueRouter from 'vue-router';
{{#if_eq state 'mobx'}}
import { observable, isObservable, toJS } from 'mobx';
import VueMobx from 'vue-mobx';
{{/if_eq}}
{{#if_eq state 'vuex'}}
import { sync } from 'vuex-router-sync';
{{/if_eq}}
{{#if_eq state 'revue'}}
import modules from '../modules/index';
{{/if_eq}}

{{#if_eq state 'mobx'}}
Vue.use(VueMobx, {
    toJS: toJS, // must
    isObservable: isObservable, // must
    observable: observable,  // optional
});
{{/if_eq}}

const env = process.env.NODE_ENV || 'development';

if (env !== 'development') {
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
}

{{#if_eq state 'vuex'}}
import store from '../store/index';
{{/if_eq}}
import i18n from '../i18n/index';
import routerOptions from '../router/index';

Vue.use(VueRouter);

const router = new VueRouter(routerOptions);

{{#if_eq state 'vuex'}}
sync(store, router);
{{/if_eq}}

const app = new Vue({
    router,
    {{#if_eq state 'vuex'}}
    store,
    {{/if_eq}}
    {{#if_eq state 'revue'}}
    modules,
    {{/if_eq}}
    i18n,
    ...Outer
});

app.$mount('#app');
