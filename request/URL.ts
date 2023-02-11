const URL = {
  PATH: {
    getNotionList: `https://api.notion.com/v1/databases/${process.env.NEXT_NOTION_DATABASE_ID}/query`,
  },
};

export default URL;
