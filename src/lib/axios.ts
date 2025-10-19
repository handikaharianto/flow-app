import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const axiosInstance = async ({ url, method, data }: AxiosRequestConfig) => {
  const sessionCookie = (await cookies()).get("session");

  const headers = {
    Cookie: `session=${sessionCookie?.value}`,
  };

  return axios({
    url,
    method,
    headers,
    data,
  });
};

export default axiosInstance;
