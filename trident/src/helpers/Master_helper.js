import axios from "axios";
import store from "../store";
import { LoginAction } from "../actions";
import { toast } from "react-toastify";


const common = store.getState().common;


export  function axiosPost(url,data,callback){
     axios
      .post(url, data,{  headers: {
         'Content-Type': "application/x-www-form-urlencoded",
      }})
      .then(function (response) {
         if(response.data.flag==1){
            callback(response.data);
         }else if(response.data.flag==0 && response.data.is_logged_in==0){
            LoginAction(false);
         }
      })
      .catch(function (error) {
         errorMsg(error.msg)
      });
}

export  function axiosPut(url,data,callback){
   axios
    .put(url, data,{  headers: {
       'Content-Type': "application/x-www-form-urlencoded",
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

export function limitBlogDescription(text){
  if(text.length>25){
      return text.slice(0, 25) + '...';
   }else{
      return text;
   };
}

export function loadBlogImages(image){
   const backend_url = "http://127.0.0.1:8000/";
   if(image){
     return backend_url + image
   }else{
      return "https://i.pinimg.com/originals/67/40/1a/67401a7b32362cc66d036c90045ea2d2.jpg";
   }

}

export function successMsg(msg){
   toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
}
export function warningMsg(msg){
   toast.warn(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
}
export function errorMsg(msg){
   toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
}
export function infoMsg(msg){
   toast.info(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
}

