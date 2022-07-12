import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        basket: [],
        orderBasket: [],
        total: 0,
        orders: [],
        sign: false,
        admin: {
            email: 'elturanfcb@gmail.com',
            password: '12345'
        },
    },
    reducers: {
        setBasket: (state, { payload }) => {
            state.basket = [...state.basket, payload]
            state.orderBasket = state.basket.filter(item => item.cancel == 'no')
            state.total = state.orderBasket.reduce((acc, item) => {
                return acc + (item.quantity * item.price)
            }, 0)
        },
        setOrders: (state) => {
            let orders = JSON.parse(localStorage.getItem('orders'))
            if (JSON.parse(localStorage.getItem('orders'))) {
                state.orders = orders
            }
            state.orders = [...state.orders, state.basket]
            localStorage.setItem('orders', JSON.stringify(state.orders))
            state.basket = []
            state.total = 0
        },
        setLocalOrders: (state, { payload }) => {
            state.orders = payload
        },
        removeOrder: (state, { payload }) => {
            state.orders = state.orders.filter((item, index) => (index !== payload))
            localStorage.setItem('orders', JSON.stringify(state.orders))
        },
        cancelOrder: (state, { payload }) => {
            state.basket.map((item, index) => {
                if (index === payload) {
                    item.cancel = 'yes'
                }
            })
            state.orderBasket = state.basket.filter(item => item.cancel === 'no')
            state.total = state.orderBasket.reduce((acc, item) => {
                return acc + (item.quantity * item.price)
            }, 0)
        },
        setSign: (state, { payload }) => {
            state.sign = payload
        },
        login: (state) => {
            localStorage.setItem('lgn', state.sign)
        },
        logout: () => {
            localStorage.removeItem('lgn')
        }
    }
})

export const { setBasket, setOrders, cancelOrder, setSign, login, logout, setLocalOrders, removeOrder} = orderSlice.actions
export default orderSlice.reducer