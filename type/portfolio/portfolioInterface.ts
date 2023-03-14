export interface TagIF {
  id: string;
  name: string;
  color: string;
}

export interface NotionResponseIF {
  title: string;
  domain: string;
  preview: string;
  // thumbnail: string;
  blurDataURL: string;
  description: string;
  created: string;
  ended: string;
  progress: boolean;
  color: string;
  tag: TagIF[];
  feature: TagIF[];
  name: string;
  github: string;
}
