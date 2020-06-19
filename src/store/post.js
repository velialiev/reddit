import PostService from '../services/PostService'
import TimeUtil from '../utils/TimeUtil'
import config from '../constants/config'

const initialState = {
  cache: {},
  error: null,
}

//#region Actions
const POSTS_BY_SUBREDDIT_REQUEST = 'POSTS_BY_SUBREDDIT_REQUEST'
const POSTS_BY_SUBREDDIT_SUCCESS = 'POSTS_BY_SUBREDDIT_SUCCESS'
const POSTS_BY_SUBREDDIT_FAILURE = 'POSTS_BY_SUBREDDIT_FAILURE'
//endregion

//#region ActionCreators
export const postsBySubredditRequest = (subreddit) => ({
  type: POSTS_BY_SUBREDDIT_REQUEST,
  payload: {
    subreddit,
  }
})

export const postsBySubredditSuccess = (subreddit, posts) => ({
  type: POSTS_BY_SUBREDDIT_SUCCESS,
  payload: {
    posts,
    subreddit,
  }
})

export const postsBySubredditFailure = (subreddit, error) => ({
  type: POSTS_BY_SUBREDDIT_FAILURE,
  payload: {
    subreddit,
    error,
  }
})
//endregion

//#region Thunks
export const getPostsBySubredditThunk = (subreddit) => async (dispatch, getState) => {
  const state = getState()
  const { posts: cachedPosts, timestamp, loading } = state.post.cache[subreddit] || {}

  if (
    loading
    || (cachedPosts?.length && !TimeUtil.isOutdated(timestamp, config.postsExpirationTime))
  ) {
    return cachedPosts || []
  }

  dispatch(postsBySubredditRequest(subreddit))

  let posts = []

  try {
    const { children } = await PostService.getBySubreddit(subreddit)
    posts = children?.map(post => post.data) || []
    dispatch(postsBySubredditSuccess(subreddit, posts))
  }
  catch (e) {
    dispatch(postsBySubredditFailure(subreddit, e))
    posts = cachedPosts || []
  }

  return posts
}
//endregion

//#region Reducer
export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POSTS_BY_SUBREDDIT_REQUEST:
      return {
        ...state,
        cache: {
          ...state.cache,
          [payload.subreddit]: {
            loading: true,
            error: null,
          },
        }
      }
    case POSTS_BY_SUBREDDIT_SUCCESS:
      return {
        ...state,
        cache: {
          ...state.cache,
          [payload.subreddit]: {
            posts: payload.posts,
            loading: false,
            timestamp: Date.now(),
          },
        },
      }
    case POSTS_BY_SUBREDDIT_FAILURE:
      return {
        ...state,
        cache: {
          ...state.cache,
          [payload.subreddit]: {
            loading: false,
            error: payload.error,
          },
        }
      }
    default:
      return state
  }
}
//endregion
