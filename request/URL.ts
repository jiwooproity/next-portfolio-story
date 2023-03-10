const URL = {
  PATH: {
    getNotionList: `https://api.notion.com/v1/databases/${process.env.NEXT_NOTION_DATABASE_ID}/query`,
    getGithubHistory: `https://github-contributions-api.jogruber.de/v4/jiwooproity`,
  },
};

export default URL;
