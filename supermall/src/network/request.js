import axios from 'axios'
export function request(config){
const instance=axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
});
instance.interceptors.request.use((config)=>{
    return config
})
instance.interceptors.response.use((config)=>{
    return config.data
})
return instance(config)
}