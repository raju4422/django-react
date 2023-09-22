const initialState = {count:0,isLogged:false};

 const common = (state = initialState,action)=>{
    const {type,payload} = action;
    switch(type){
       case "INCREMENT":
         return {...state,count : state.count + payload};
        case "DECREMENT":
            return {...state,count : state.count - payload};
        case "LOGIN_STATE_CHANGE":
            return {...state,isLogged : payload};
        default:
           return state;
    }
}

export default common;