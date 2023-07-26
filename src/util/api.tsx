const API_URL = 'https://api.reddit.com';
const ROUTE_PICS_SUB = '/r/pics';

export enum POST_TYPE {
  HOT = 'hot',
  NEW = 'new',
  TOP = 'top',
  CONTROVERSIAL = 'controversial',
}
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

export const getPosts = async (postType: string): Promise<RedditPost[]> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}${ROUTE_PICS_SUB}/${postType}.json`)
      .then(response => response.json())
      .then(json => resolve(json.data.children))
      .catch(error => reject(error));
  });
};
