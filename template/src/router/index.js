// dynamic import for on-demand loaded chunk
const Info = () => import(/* webpackChunkName: "info" */ '../general/info/index');
const Test = () => import(/* webpackChunkName: "test" */ '../general/test/index');
const App = () => import(/* webpackChunkName: "main" */ '../general/app/index');

const Outer = { template: '<router-view></router-view>' };

export default {
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Outer,
            children: [
                // 嵌套路由 https://github.com/vuejs/vue-router/blob/next-doc/docs/en/advanced-routing/nested.md
                { path: '', component: App },
                { path: 'info', component: Info },
                { path: 'test', component: Test }
            ]
        }
    ]
}