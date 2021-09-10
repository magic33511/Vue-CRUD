import Vue from 'vue'
import Router from 'vue-router'
import Products from '../components/Product.vue'
import ProductPage from '../components/ProductPage.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Products',
            component: Products
        },
        {
            path: '/product/:id',
            name: 'ProductPage',
            component: ProductPage
        }
    ]
})
