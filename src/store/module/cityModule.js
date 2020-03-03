const module = {
    namespaced:true, //开启命名空间
    state:{
      cityName: "北京",    //公共状态
      cityId: "110100"
    },
    actions:{
  
    },
    mutations:{
        //修改状态
      setCityName(state,name){
        state.cityName = name
      },
      setCityId(state,id){
        state.cityId = id
      }
    }
  }
  
  export default module
  