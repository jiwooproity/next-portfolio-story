import { getPlaiceholder } from "plaiceholder";
import Method from "./Method";
import Request from "./Request";
import URL from "./URL";

export const API = {
  getNotionList: ({ params }: any) => {
    return Request({
      method: Method.HTTP.POST,
      url: URL.PATH.getNotionList,
      body: { ...params },
    });
  },
};

export const CONVERT_IMAGE = {
  PLAICEHOLDER_API: async (value: string) => {
    const { base64 } = await getPlaiceholder(value);
    return base64;
  },
  SINGLE: async ({ imageUrl }: { imageUrl: string }) => {
    return await CONVERT_IMAGE.PLAICEHOLDER_API(imageUrl);
  },
  MULTIE: async ({ imageUrls }: { imageUrls: string[] }) => {
    return await Promise.all(imageUrls.map(CONVERT_IMAGE.PLAICEHOLDER_API));
  },
};
