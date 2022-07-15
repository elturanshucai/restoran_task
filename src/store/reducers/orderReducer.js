import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        basket: [],
        orderBasket: [],
        total: 0,
        orders: [],
        myorder: {},
        sign: false,
        admin: {
            email: 'elturanfcb@gmail.com',
            password: '12345'
        },
        quantity: 0,
    },
    reducers: {
        setBasket: (state, { payload }) => {
            state.basket = [...state.basket, payload]
            state.orderBasket = state.basket.filter(item => item.cancel == 'no')
            state.total = state.orderBasket.reduce((acc, item) => {
                return acc + (item.quantity * item.price)
            }, 0)
        },
        setOrders: (state, { payload }) => {
            let orders = JSON.parse(localStorage.getItem('orders'))
            if (orders) {
                state.orders = orders
            }
            state.myorder = payload
            state.orders = [...state.orders, state.myorder]
            localStorage.setItem('orders', JSON.stringify(state.orders))
            state.total = 0
            state.basket = []
        },
        trueSuccess: (state, { payload }) => {
            state.orders[payload].success = true
            localStorage.setItem('orders', JSON.stringify(state.orders))
        },
        setLocalOrders: (state, { payload }) => {
            state.orders = payload
        },
        removeOrder: (state, { payload }) => {
            state.orders=JSON.parse(localStorage.getItem('orders'))
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
        },
        setQuantity: (state, { payload }) => {
            state.quantity = payload
        }
    }
})

export const { setBasket, setOrders, cancelOrder, setSign, login, logout, setLocalOrders, removeOrder, setQuantity, trueSuccess } = orderSlice.actions
export default orderSlice.reducer