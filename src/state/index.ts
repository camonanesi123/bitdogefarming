import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import farmsReducer from './farms'
import farms3Reducer from './farms3'
import poolsReducer from './pools'
import profileReducer from './profile'
import blockReducer from './block'
import collectiblesReducer from './collectibles'
import achievementsReducer from './achievements'
import teamsReducer from './teams'
import toastsReducer from './toasts'
import pricesReducer from './prices'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    farms3: farms3Reducer,
    toasts: toastsReducer,
    pools: poolsReducer,
    prices: pricesReducer,
    profile: profileReducer,
    teams: teamsReducer,
    achievements: achievementsReducer,
    block: blockReducer,
    collectibles: collectiblesReducer,
  },
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
