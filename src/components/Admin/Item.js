import './style.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeOrder } from '../../store/reducers/orderReducer'
import { FaTrash } from 'react-icons/fa'

function Item({ item, index }) {
    const dispatch = useDispatch()
    const [display, setDisplay] = useState(false)
    let sifarisler = item.filter(item => item.cancel == 'no')
    let toplam = sifarisler.reduce((acc, element) => {
        return acc + (element.quantity * element.price)
    }, 0)
    let noqte = String(toplam).indexOf('.')
    if (noqte !== -1) {
        toplam = String(toplam).slice(0, noqte + 3)
    }
    const remove = () => {
        dispatch(removeOrder(index))
        setDisplay(false)
    }

    return (
        <>
            <div className='list'>
                <div className='item'>
                    <div>{index + 1}</div>
                    <div>{item[0]?.table}</div>
                    <div>{item[0]?.worker}</div>
                    <div>{toplam} AZN</div>
                    <div>{item[0]?.date}</div>
                    <button id='look' onClick={() => setDisplay(true)} >Bax</button>
                </div>

                {
                    display ?
                        <div className='info'>
                            <div className='itemhead'>
                                <div id='delete' onClick={remove}><FaTrash fontSize={18} /></div>
                                <div onClick={() => setDisplay(false)} id='hide'>Gizlət</div>
                            </div>
                            {
                                item.map((item, index) => (
                                    <div className='iteminner' key={index}>
                                        <div>{item.food}</div>
                                        <div>{item.price} AZN</div>
                                        <div>{item.quantity} ədəd</div>
                                        <div>{item.hours}</div>
                                        {
                                            item.cancel == 'yes' ?
                                                <div className='cancel'>Imtina</div> : <div className='ready'>Verildi</div>
                                        }
                                    </div>

                                ))
                            }
                        </div> : null
                }


            </div>

        </>
    )
}

export default Item