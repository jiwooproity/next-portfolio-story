import axios, { AxiosRequestConfig } from "axios";
import Method from "./Method";
import URL from "./URL";

interface HttpRequestIF {
  url: string;
  method: string;
  params?: any;
  data?: any;
}

interface RequestIF {
  url: string;
}

interface AxiosRequestIF extends RequestIF {
  params?: any;
  data?: any;
}

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_NOTION_SECRETE_TOKEN}`,
    "Notion-Version": "2022-06-28",
  },
};

const notionInstance = axios.create({
  headers: { ...config.headers },
});

const defaultInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const getAxios = ({ url, params }: AxiosRequestIF) => {
  return defaultInstance.get(url, { params });
};

const postAxios = async ({ url, params, data }: AxiosRequestIF) => {
  if (url === URL.PATH.getNotionList) {
    return await notionInstance.post(url, { ...data });
  }
};

const Request = async ({ url, method, params, data }: HttpRequestIF) => {
  let response: any = "";

  switch (method) {
    case Method.HTTP.GET:
      response = await getAxios({ url, params });
      break;
    case Method.HTTP.POST:
      response = await postAxios({ url, params, data });
      break;
    default:
      break;
  }

  return {
    data: response.data,
    status: response.status,
  };
};

export default Request;
