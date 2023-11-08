import { createModel } from '@rematch/core'
import { api, conf } from '../core'
import type { RootModel } from './index'

type Post = { id: string; title: string }
type TState = { data: Post[] }

const InitialState: TState = {
  data: [],
}

const posts = createModel<RootModel>()({
  state: InitialState,
  reducers: {
    setPosts(state, payload: TState) {
      const { data } = payload

      return {
        ...state,
        data,
      }
    },
    clearData() {
      return InitialState
    },
  },
  effects: (dispatch: any) => ({
    clearState() {
      dispatch.units.clearData()
    },
    async getPosts() {
      try {
        const response: Post[] = await api.get(conf.apis.posts)

        dispatch.posts.setPosts({
          data: response,
        })
      } catch (error) {
        console.log(error)
      }
    },
  }),
})

export default posts
