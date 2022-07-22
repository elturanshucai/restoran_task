import './style.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeOrder  } from '../../store/reducers/orderReducer'
import { FaTrash } from 'react-icons/fa'

function Item({ item, index, success, id }) {
    const dispatch = useDispatch()
    const [display, setDisplay] = useState(false)
    let sifarisler = item.arr.filter(item => item.cancel == 'no')
    let toplam = sifarisler.reduce((acc, element) => {
        return acc + (element.quantity * element.price)
    }, 0)
    let noqte = String(toplam).indexOf('.')
    if (noqte !== -1) {
        toplam = String(toplam).slice(0, noqte + 3)
    }
    const remove = () => {
        dispatch(removeOrder(id))
        setDisplay(false)
    }

    return (
        <>
            <div className='list'>
                <div className='item'>
                    <div className='sira'>{index + 1}</div>
                    <div className='masa'>{item.arr[0]?.table}</div>
                    <div className='worker'>{item.arr[0]?.worker}</div>
                    <div className='toplam'>{toplam} AZN</div>
                    <div className='tarix'>{item.arr[0]?.date}</div>
                    {
                        success ?
                        <div className='status finish'>Bəli</div>:<div className='status notfinish'>Xeyr</div>
                    }
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
                                item.arr.map((item, index) => (
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