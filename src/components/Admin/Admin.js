import './style.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSign, logout } from '../../store/reducers/orderReducer'
import Item from './Item'
import { FaSignOutAlt } from 'react-icons/fa'


function Admin() {
    const dispatch = useDispatch()
    const cixish = () => {
        dispatch(setSign(false))
        dispatch(logout())
    }
    const orders = useSelector(state => state.orderReducer.orders)
    const localOrders = JSON.parse(localStorage.getItem('orders'))


    let sifarisler1 = orders.map(item => (
        item.filter(order => order.cancel == 'no')
    ))
    let sifarisler2 = localOrders?.map(item => (
        item.filter(order => order.cancel == 'no')
    ))
    let total = 0
    sifarisler1.map(order => (
        total += order.reduce((acc, element) => {
            return acc + (element.price * element.quantity)
        }, 0)
    ))

    let localTotal = 0
    sifarisler2?.map(order => (
        localTotal += order.reduce((acc, element) => {
            return acc + (element.price * element.quantity)
        }, 0)
    ))

    return (
        <div className='admin'>
            {
                orders.length > 0 ?
                    <>
                        <div className='listtitle'>
                            <div>Sira</div>
                            <div>Masa</div>
                            <div>İsci</div>
                            <div>Mebleg</div>
                            <div>Tarix</div>
                            <div>Goster</div>
                        </div>
                        <div className='orderlist'>
                            {orders?.map((order, index) => (
                                <Item key={index} item={order} index={index} />
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <div className='listtitle'>
                            <div>Sira</div>
                            <div>Masa</div>
                            <div>İsci</div>
                            <div>Mebleg</div>
                            <div>Tarix</div>
                            <div>Goster</div>
                        </div>
                        <div className='orderlist'>
                            {localOrders?.map((order, index) => (
                                <Item key={index} item={order} index={index} />
                            ))}
                        </div>
                    </>
            }
            <div className='total'>
                <p>Cəmi : </p>
                {
                    localTotal ?
                        <div>{localTotal} AZN</div> :
                        <div>{total} AZN</div>
                }


            </div>
            <footer>
                <Link to='/'>HOME</Link>
                <Link to='/' onClick={cixish}><FaSignOutAlt fontSize={25} color='white' /></Link>
            </footer>
        </div>

    )
}

export default Admin