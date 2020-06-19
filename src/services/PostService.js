import ApiService from './ApiService'
import Url from '../constants/Url'

class PostService {
  static getBySubreddit(subreddit) {
    return ApiService.get(Url.GET_POSTS_BY_SUBREDDIT(subreddit))
  }
}

export default PostService
