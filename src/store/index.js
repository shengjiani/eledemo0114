import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [CreatePersistedState({
        storage: window.sessionStorage
    })],
    // 定义状态
    state: {
        userinfo: null
    },
    // 定义改变状态的方法
    mutations: {
        setUserInfo(state, data) {
            state.userinfo = data;
        }
    }
})