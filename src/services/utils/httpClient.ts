/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { storage } from "./storage";

const httpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    try {
      const access_token = storage.getString("9sgbi.access_token");
      config.headers.Authorization = `Bearer ${access_token}`;
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: any = [];
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (error.response.data === "token is expired\n") {
        const refresh_token = storage.getString("refresh_token");
        const originalRequest = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          httpClient
            .post("/refresh", {
              headers: { Authorization: `Bearer ${refresh_token}` },
            })
            .then((response) => {
              const { access_token, refresh_token } = response.data.data;
              storage.set("9sgbi.access_token", access_token);
              storage.set("9sgbi.refresh_token", refresh_token);

              httpClient.defaults.headers[
                "Authorization"
              ] = `Bearer ${access_token}`;

              failedQueue.forEach((request: any) =>
                request.onSuccess(access_token)
              );
              failedQueue = [];
            })
            .catch(async (err) => {
              failedQueue.forEach((request: any) => request.onFailure(err));
              failedQueue = [];

              storage.delete("9sgbi.access_token");
              storage.delete("9sgbi.refresh_token");
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({
            onSuccess: (token: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(httpClient(originalRequest));
            },
            onFailure: (err: any) => {
              reject(err);
            },
          });
        });
      }

      if (error.response.data === "token is unauthorized\n") {
        storage.delete("9sgbi.access_token");
        storage.delete("9sgbi.refresh_token");
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
