import axios from "axios";
import store from "../store";
import { LoginAction } from "../actions";

const common = store.getState().common;


export function axiosPost(url,data,callback){
    axios
      .post(url, data,{  headers: {
         'Content-Type': "application/x-www-form-urlencoded"
      }})
      .then(function (response) {
         if(response.flag==1){
            callback(response);
         }else if(response.flag==0 && response.is_logged_in==0){
            LoginAction(false);
         }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });

}