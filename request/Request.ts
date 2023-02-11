import axios, { AxiosRequestConfig } from "axios";
import Method from "./Method";

type getParametersType = {
  url: string;
  query: object;
  body: object;
};

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_NOTION_SECRETE_TOKEN}`,
    "Notion-Version": "2022-06-28",
  },
};

const instance = axios.create(config);

const getRequest = async ({ url, query, body }: getParametersType) => {
  if (query) {
    const { data }: any = await instance.get(url, { params: { ...query } });
    return data;
  }
  if (body) return;
};

const postRequest = async ({ url, query, body }: getParametersType) => {
  if (query) return;
  if (body) {
    const { data }: any = await instance.post(url, { ...body });
    return data;
  }
};

const Request = async ({ method, url, query, body }: any) => {
  let response;

  switch (method) {
    case Method.HTTP.GET:
      response = await getRequest({ url, query, body });
      return response.results;
    case Method.HTTP.POST:
      response = await postRequest({ url, query, body });
      return response.results;
    default:
      break;
  }
};

export default Request;
