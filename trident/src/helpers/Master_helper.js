import axios from "axios";
import store from "../store";
import { LoginAction } from "../actions";
import { toast } from "react-toastify";
import  axiosInstance  from "../helpers/interceptor";


export const base_url = "http://localhost:8000/api/";

export function axiosPost(url, data, callback) {
   axiosInstance
    .post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(function (response) {
      if (response.data.flag == 1) {
        callback(response.data);
      } else if (response.data.flag == 0 && response.data.is_logged_in == 0) {
        LoginAction(false);
      } else if (response.data.flag == 2) {
        warningMsg(response.data.msg);
      }
    })
    .catch(function (error) {
      errorMsg(error.msg);
    });
}

export function axiosPut(url, data, callback) {
   axiosInstance
    .put(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(function (response) {
      if (response.data.flag == 1) {
        callback(response.data);
      } else if (response.data.flag == 0 && response.data.is_logged_in == 0) {
        LoginAction(false);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

export function axiosGet(url, callback,auth_token) {
   axiosInstance
    .get(url)
    .then(function (response) {
      if (response.data.flag == 1) {
        callback(response.data);
      } else if (response.data.flag == 2) {
        warningMsg(response.data.msg);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

export function axiosDelete(url, data, callback) {
   axiosInstance
    .delete(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(function (response) {
      if (response.data.flag == 1) {
        callback(response.data);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

export function limitBlogDescription(text,limit) {
  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  } else {
    return text;
  }
}

export function loadBlogImages(image) {
  const backend_url = "http://127.0.0.1:8000/";
  if (image) {
    return backend_url + image;
  } else {
    return "https://i.pinimg.com/originals/67/40/1a/67401a7b32362cc66d036c90045ea2d2.jpg";
  }
}

export function load_images(image) {
  const backend_url = "http://127.0.0.1:8000/";
  if (image) {
    return backend_url + image;
  } else {
    return "https://i.pinimg.com/originals/67/40/1a/67401a7b32362cc66d036c90045ea2d2.jpg";
  }
}

export function successMsg(msg) {
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
export function warningMsg(msg) {
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
export function errorMsg(msg) {
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
export function infoMsg(msg) {
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
