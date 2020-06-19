import React, { useRef } from 'react'
import { DeleteOutlined, HeartFilled } from '@ant-design/icons'
import styled from 'styled-components'
import useDragAndDrop from '../hooks/useDragAndDrop'
import ItemTypes from '../constants/ItemTypes'

const Post = (
  {
    title,
    link,
    favorite,
    toggleFavorite,
    deletePost,
    movePost,
    id,
    index,
  }
) => {
  const ref = useRef(null)
  const isDragging = useDragAndDrop(id, index, ref, ItemTypes.POST, movePost)
  const opacity = isDragging ? 0 : 1

  return (
    <PostContainer opacity={opacity} ref={ref}>
      <HeartFilled
        onClick={toggleFavorite}
        style={{
          color: favorite ? '#eb2f2f' : '#9d9d9d',
          padding: '8px',
        }}
      />
      <DeleteOutlined
        onClick={deletePost}
        style={{
          padding: '8px',
        }}
      />
      <a target="_blank" href={link}>
        {title}
      </a>
    </PostContainer>
  )
}

const PostContainer = styled.div`
  opacity: ${props => props.opacity}
`

export default Post
