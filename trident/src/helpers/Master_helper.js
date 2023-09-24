import axios from "axios";
import store from "../store";
import { LoginAction } from "../actions";

const common = store.getState().common;


export  function axiosPost(url,data,callback){
     axios
      .post(url, data,{  headers: {
         'Content-Type': "application/x-www-form-urlencoded"
      }})
      .then(function (response) {
         if(response.data.flag==1){
            callback(response.data);
         }else if(response.data.flag==0 && response.data.is_logged_in==0){
            LoginAction(false);
         }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
}

export function axiosGet(url,callback){
   axios
    .get(url)
    .then(function (response) {
       if(response.data.flag==1){
          callback(response.data);
       }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

