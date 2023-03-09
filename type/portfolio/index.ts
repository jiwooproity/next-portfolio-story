export interface ValueType {
  title: string;
  background: string;
  domain: string;
  preview: string;
  // thumbnail: string;
  blurDataURL: string;
  description: string;
  created: string;
  ended: string;
  progress: boolean;
  color: string;
  tag: {
    id: string;
    name: string;
    color: string;
  }[];
  feature?: {
    id: string;
    name: string;
    color: string;
  }[];
  name: string;
  github: string;
}

export type ResponseType = {
  data: ValueType[];
};

export type LabelPropsType = {
  value: ValueType;
  label: string;
};
