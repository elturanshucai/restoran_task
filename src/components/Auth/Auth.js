import React from "react";
import Admin from "../Admin/Admin";
import Login from "../Login/Login";
import { useDispatch, useSelector } from 'react-redux'
import { setSign } from "../../store/reducers/orderReducer";

function Auth() {
    const dispatch = useDispatch()
    const sign = useSelector(state => state.orderReducer.sign)
    if (localStorage.getItem('lgn') != null) {
        dispatch(setSign(localStorage.getItem('lgn')))
    }

    return (
        <>
            {
                sign ?
                    <Admin />
                    :
                    <Login />
            }
        </>
    )
}

export default Auth