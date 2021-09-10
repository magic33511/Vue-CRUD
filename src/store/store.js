// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        products: []
    },

    mutations: {
        addProduct(state, { payload }) {
            state.products.push(payload);
        },
        deleteProduct(state, { index }) {
            state.products.splice(index, 1)
        },
        editProduct(state, { payload }) {
            console.log(payload);
            state.products[payload.id] = {
                id: payload.id,
                product_id: payload.product_id,
                product_name: payload.product_name,
                product_price: payload.product_price,
            }
        }
    },

    actions: {
        addProduct({ commit }, payload) {
            commit("addProduct", { payload });
        },
        deleteProduct({ commit }, index) {
            commit("deleteProduct", { index });
        },
        editProduct({ commit }, payload) {
            commit("editProduct", { payload })
        }
    },

    getters: {
        products: state => state.products
    }
});