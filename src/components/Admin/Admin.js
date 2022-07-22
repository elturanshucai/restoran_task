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
    const trueOrders = localOrders?.filter(item => item.success == true)
    const trueSCS = orders.filter(item => item.success == true)


    let sifarisler1 = trueSCS.map(item => (
        item.arr.filter(order => order.cancel == 'no')
    ))
    let sifarisler2 = trueOrders?.map(item => (
        item.arr.filter(order => order.cancel == 'no')
    ))
    let total = 0
    sifarisler1.map(order => (
        total += order.reduce((acc, element) => {
            return acc + (element.price * element.quantity)
        }, 0)
    ))
    let noqte1 = String(total).indexOf('.')
    if(noqte1!==-1){
        total=String(total).slice(0, noqte1 + 3)
    }

    let localTotal = 0
    sifarisler2?.map(order => (
        localTotal += order.reduce((acc, element) => {
            return acc + (element.price * element.quantity)
        }, 0)
    ))
    let noqte2 = String(localTotal).indexOf('.')
    if(noqte2!==-1){
        localTotal=String(localTotal).slice(0, noqte2 + 3)
    }

    return (
        <div className='admin'>
            {
                orders.length > 0 ?
                    <>
                        <div className='listtitle'>
                            <div className='sira'>Sira</div>
                            <div className='masa'>Masa</div>
                            <div className='worker'>İsci</div>
                            <div className='toplam'>Mebleg</div>
                            <div className='tarix'>Tarix</div>
                            <div className='status'>Sonlanıb</div>
                            <div className='show'>Goster</div>
                        </div>
                        <div className='orderlist'>
                            {
                                orders.map((item, index) => (
                                    <Item key={index} item={item} index={index} id={item.id} success={item.success} />
                                ))
                            }

                        </div>
                    </>
                    :
                    <>
                        <div className='listtitle'>
                            <div className='sira'>Sira</div>
                            <div className='masa'>Masa</div>
                            <div className='worker'>İsci</div>
                            <div className='toplam'>Mebleg</div>
                            <div className='tarix'>Tarix</div>
                            <div className='status'>Sonlanıb</div>
                            <div className='show'>Goster</div>
                        </div>
                        <div className='orderlist'>
                            {
                                localOrders?.map((item, index) => (
                                    <Item key={index} item={item} index={index} id={item.id} success={item.success} />
                                ))
                            }
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