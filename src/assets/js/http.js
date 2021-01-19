// axios拦截器
import Vue from 'vue'
import axios from 'axios'
import store from '../../store'
// 创建axios实例
const http = axios.create({
    baseURL:''
});

// 响应拦截器
http.interceptors.response.use(res=>{
    console.log(res,'响应...');
    if(res.data.code!=200){
        // alert(res.data.msg)
        Vue.prototype.$message(res.data.msg)
    }
    return res;
})

// 请求拦截器
http.interceptors.request.use(req=>{
    console.log('请求...');
    if(store.state.userinfo){
        req.headers.Authorization = store.state.userinfo.token;
    }
    return req;
})

export default http;