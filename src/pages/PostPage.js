import React, { useCallback } from 'react'
import AnimatedButtons from '../components/AnimatedButtons'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsBySubredditThunk } from '../store/post'
import RandomUtil from '../utils/RandomUtil'
import ObjectUtil from '../utils/ObjectUtil'
import { uuid } from 'uuidv4'
import useStoredState from '../hooks/useStoredState'
import update from 'immutability-helper'
import useUndoRedo from '../hooks/useUndoRedo'
import { Button } from 'antd'

const PostPage = () => {
  const dispatch = useDispatch()
  const loadings = ObjectUtil
    .unpackNestedField(useSelector(state => state.post.cache), 'loading')
  const [posts, setPosts] = useStoredState('posts', []);
  const [prev, next, currentPosition, totalPositions] = useUndoRedo(posts, setPosts)

  const getPostsBySubreddit = (subreddit) => {
    return dispatch(getPostsBySubredditThunk(subreddit))
  }

  const getRandomPostBySubreddit = async (subreddit) => {
    const posts = await getPostsBySubreddit(subreddit)
    return posts[RandomUtil.getRandomFromInterval(0, posts.length - 1)]
  }

  const addPost = (post) => {
    if (!post) {
      return
    }

    setPosts([
      ...posts,
      {
        ...post,
        id: uuid(),
      },
    ])
  }

  const togglePostFavoriteStatus = (id) => {
    setPosts(
      posts.map(post => {
        if (post.id !== id) {
          return post
        }

        return {
          ...post,
          favorite: !post.favorite,
        }
      })
    )
  }

  const deletePost = (id) => {
    setPosts(
      posts.filter(post => post.id !== id)
    )
  }

  const movePost = useCallback(
    (dragIndex, hoverIndex) => {
      const dragPost = posts[dragIndex]
      setPosts(
        update(posts, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragPost],
          ],
        }),
      )
    },
    [posts],
  )

  return (
    <div>
      <AnimatedButtons
        buttons={subredditButtonsConfig}
        loadings={loadings}
        onClick={async (subreddit) => {
          const randomPost = await getRandomPostBySubreddit(subreddit)
          addPost(randomPost)
        }}
      />
      <Button disabled={currentPosition === 0} onClick={prev}>Prev</Button>
      <Button disabled={currentPosition === totalPositions} onClick={next}>Next</Button>

      {
        posts.map((post, idx) => {
          return <React.Fragment key={post.id}>
            <Post
              id={post.id}
              index={idx}
              movePost={movePost}
              title={post.title}
              link={post.url}
              favorite={post.favorite}
              toggleFavorite={() => togglePostFavoriteStatus(post.id)}
              deletePost={() => deletePost(post.id)}
            />
            <br/>
          </React.Fragment>
        })
      }
    </div>
  )
}

const subredditButtonsConfig = [
  {
    name: 'frontend',
  },
  {
    name: 'reactjs',
  },
  {
    name: 'vuejs',
  },
  {
    name: 'angular',
  },
]

export default PostPage
