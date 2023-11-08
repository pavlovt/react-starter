import { Models, RematchDispatch, RematchRootState, init } from '@rematch/core';
import posts from './posts';

export interface RootModel extends Models<RootModel> {
  posts: typeof posts
}

export const models: RootModel = {
  posts,
}

export const store = init<RootModel>({
  models,
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
