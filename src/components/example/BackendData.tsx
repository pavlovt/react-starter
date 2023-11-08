import { take } from 'lodash-es'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from 'store'

type Post = { id: string; title: string }

const BackendData = () => {
  const dispatch = useDispatch<Dispatch>()
  const posts = useSelector((state: RootState) => state.posts.data)

  useEffect(() => {
    dispatch.posts.getPosts()
  }, [dispatch.posts])

  return (
    <ul>
      {take(posts, 5).map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

export default BackendData
