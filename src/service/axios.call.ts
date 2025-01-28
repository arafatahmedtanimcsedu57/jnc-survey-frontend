import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { getFromLocalStorage } from "../redux/common";

import apis from "./Apis";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

const addTokenToHeaders = () => {
  const token = getFromLocalStorage("fb-auth-token");
  if (token) {
    return `Bearer ${token}`;
  }
};

export const Get = <T>(p: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance({
    method: "get",
    baseURL: apis.BASE,
    ...p,
  });
};

export const Post = <T>(p: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance({
    baseURL: apis.BASE,
    method: "post",
    ...p,
  });
};

export const Put = <T>(
  p: AxiosRequestConfig,
): Promise<AxiosRequestConfig<T>> => {
  return axiosInstance({
    baseURL: apis.BASE,
    method: "put",
    ...p,
  });
};

export const SecureGet = async <T>(
  p: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    return await axiosInstance({
      method: "get",
      baseURL: apis.BASE,
      ...p,
      headers: {
        Authorization: addTokenToHeaders(),
      },
      params: { ...p.params },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const SecurePost = async <T>(
  p: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    return await axiosInstance({
      method: "post",
      baseURL: apis.BASE,
      ...p,
      headers: {
        Authorization: addTokenToHeaders(),
      },
      params: { ...p.params },
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const SecurePut = async <T>(
  p: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    return await axiosInstance({
      method: "put",
      baseURL: apis.BASE,
      ...p,
      headers: {
        Authorization: addTokenToHeaders(),
      },
      params: { ...p.params },
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const SecureUpload = async <T>(
  p: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    return await axiosInstance({
      method: "post",
      baseURL: apis.BASE,
      ...p,
      headers: {
        Authorization: addTokenToHeaders(),
        "content-type": "multipart/form-data",
      },
      params: { ...p.params },
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const SecureDelete = async <T>(
  p: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    return await axiosInstance({
      method: "delete",
      baseURL: apis.BASE,
      ...p,
      headers: {
        Authorization: addTokenToHeaders(),
      },
      params: { ...p.params },
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};
