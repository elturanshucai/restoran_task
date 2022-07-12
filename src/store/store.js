import {configureStore} from '@reduxjs/toolkit'
import orderReducer from './reducers/orderReducer'

const store=configureStore({
    reducer: {orderReducer}
})

export default store