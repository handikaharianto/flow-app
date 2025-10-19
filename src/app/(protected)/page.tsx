import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";

const HomePage = async () => {
  const response = await axiosInstance({
    url: "http://localhost:3000/api/orders",
    method: "GET",
  });
  const { rows, total } = response.data;

  return <div>{JSON.stringify(rows)}</div>;
};

export default HomePage;
