import './style.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, setSign } from '../../store/reducers/orderReducer'

function Login() {
    const dispatch = useDispatch()
    const email = useSelector(state => state.orderReducer.admin.email)
    const password = useSelector(state => state.orderReducer.admin.password)
    let mail, parol
    const changeMail = (e) => {
        mail = e.target.value
    }
    const changeParol = (e) => {
        parol = e.target.value
    }
    const auth = () => {
        if (mail === email && parol === password) {
            dispatch(setSign(true))
            dispatch(login())
        }
        else {
            document.querySelector('#email').value = ''
            document.querySelector('#password').value = ''
        }
    }


    return (
        <div className='login'>
            <label>
                <p>E-mail</p>
                <input type='email' id='email' onChange={changeMail} />
            </label>
            <label>
                <p>Password</p>
                <input type='password' id='password' onChange={changeParol} />
            </label>
            <button type='button' onClick={auth}> LOGIN </button>
        </div>
    )
}

export default Login