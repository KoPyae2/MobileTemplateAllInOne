import { post, get } from "@/utils/request";

export const userRegister = (data) => {
  return post("/users/register", data);
};

export const userLogin = (data) => {
  return post("/users/login", data);
};  

export const loginwithGoogleApi = (data) => {
  return post("/users/google/login", data);
}; 

export const registerwithGoogleApi = (data) => {
  return post("/users/google/register", data);
}; 

export const loginwithFacebookApi = (data) => {
  return post("/users/facebook/login", data);
};

export const registerwithFacebookApi = (data) => {
  return post("/users/facebook/register", data);
};

export const userLogOut = (data) => {
  return post("/users/logout",data);
};

export const userUpdate = (data) => {
  return post("/users/update",data);
};   

export const userConfig = (data) => {
  return get("/users/system-config",data);
};

export const winningRecord = (data) => {
  return get("/luck/history",data);
};
