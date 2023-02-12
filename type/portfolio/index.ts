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
  tag: any[];
  name: string;
  github: string;
}

export interface ResponseType {
  data: ValueType[];
}

export interface LabelPropsType {
  value: ValueType;
  label: string;
}
