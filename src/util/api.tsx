const API_URL = 'https://api.reddit.com';
const ROUTE_PICS_SUB = '/r/pics';

export interface RedditPost {
  kind: string;
  data: {
    thumbnail: string;
    title: string;
    author_fullname: string;
    score: number;
    num_comments: number;
    created_utc: number;
    url: string;
  };
}

export const getPosts = async (): Promise<RedditPost[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}${ROUTE_PICS_SUB}/hot.json`)
      .then(response => response.json())
      .then(json => resolve(json.data.children))
      .catch(error => reject(error));
  });
};
