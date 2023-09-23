const initialState = {userId:0,userName:"",userEmail:"",authToken:""};
const setUser = (state = initialState,action)=>{
    const {type,payload} = action;
    switch(type){
       case "SET_USER_DATA":
          return payload;
        default:
           return state;
    }
}
export default setUser;