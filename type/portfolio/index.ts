export type ValueType = {
  title: string;
  domain: string;
  thumbnail: string;
  blurDataURL: string;
  description: string;
  created: string;
  ended: string;
  progress: boolean;
  color: string;
  tag: any[];
  name: string;
};

export type ResponseType = {
  data: ValueType[];
};

export type LabelPropsType = {
  value: ValueType;
  label: string;
};
