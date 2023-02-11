import axios, { AxiosRequestConfig } from "axios";
import Method from "./Method";

// type RequestType = {
//   method: string;
//   url: string;
//   query: object;
//   body: object;
// };

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

const getRequest = ({ url, query, body }: getParametersType) => {
  if (query) return;
  if (body) {
    const { data }: any = instance.get(url, { data: { ...body } });
    return data;
  }
};

const postRequest = async ({ url, query, body }: getParametersType) => {
  if (query) return;
  if (body) {
    const { data }: any = await instance.post(url, { ...body });
    return data;
  }
};

const Request = async ({ method, url, query, body }: any) => {
  switch (method) {
    case Method.HTTP.GET:
      return await getRequest({ url, query, body });
    case Method.HTTP.POST:
      const { results } = await postRequest({ url, query, body });
      return results;
    default:
      break;
  }
};

export default Request;
