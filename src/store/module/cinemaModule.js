import http from '@/util/http'

const module = {
    namespaced:true,  //开启命名空间
    state:{
        cinemaList:[]
    },
    actions:{
        //1.通过方法响应请求
        getCinemaAction(store,id){
            // console.log(store.rootState.city.cityId)
            //1.传id  2.获取id（store.rootState.city.cityId）
            http.request({
            url:`/gateway?cityId=${store.rootState.city.cityId}&ticketFlag=1&k=6798623`,
            headers:{
                'X-Host': 'mall.film-ticket.cinema.list'
            }
            }).then(res=>{
            // console.log("影院",res.data)
            // 2.先将数据请求过来，触发事件
            store.commit("setCinemaList",res.data.data.cinemas) //支持传参
            // this.arealist =......
            })
        }
    },
    mutations:{
        //3.通过事件修改公共状态
        setCinemaList(state,data){
            // console.log("setCinemaList",data)
            state.cinemaList = data
        },
    },
    getters:{
        topDataList(state){
            return state.cinemaList.slice(0,5)
        }
    }
}

export default module