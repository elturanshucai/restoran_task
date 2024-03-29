import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import tables from '../../JSONs/tables.json'
import workers from '../../JSONs/workers.json'
import foods from '../../JSONs/foods.json'
import './style.css'
import { cancelOrder, setBasket, setOrders, setQuantity, trueSuccess } from "../../store/reducers/orderReducer";

function Order() {

    const [order, setOrder] = useState(false)
    const quantity = useSelector(state => state.orderReducer.quantity)
    const orders = useSelector(state => state.orderReducer.orders)
    const [price, setPrice] = useState(foods[0].price)
    const [table, setTable] = useState(tables[0].masa)
    const [food, setFood] = useState(foods[0].food)
    const [worker, setWorker] = useState(workers[0].name)
    const [time, setTime] = useState(foods[0].time)
    const [disabled, setDisabled] = useState(true)
    const [success, setSucces] = useState(false)
    const [select, setSelect]=useState(false)

    const dispatch = useDispatch()

    const data = {}

    const start = () => {
        setOrder(true)
        setSelect(true)
    }
    const inputChange = (e) => {
        if (e.target.value > 0) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
        dispatch(setQuantity(parseInt(e.target.value)))
    }

    let eat = foods[0].food
    const changeFood = (e) => {
        eat = e.target.value
        setFood(e.target.value)
        foods.map(item => {
            if (item.food == eat) {
                setPrice(item.price)
                setTime(item.time)
            }
        })
    }
    const basket = useSelector(state => state.orderReducer.basket)
    const total = useSelector(state => state.orderReducer.total)

    let cem = total
    let dock = String(cem).indexOf('.')
    if (dock !== -1) {
        cem = String(cem).slice(0, dock + 3)
    }

    const changeTable = (e) => {
        setTable(e.target.value)
    }
    const changeWorker = (e) => {
        setWorker(e.target.value)
    }
    const add = () => {
        let date = new Date()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        if (hours < 10) {
            hours = '0' + hours
        }
        let minutes = date.getMinutes()
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        let year = date.getFullYear()
        data.date = `${day}.${month}.${year}`
        data.hours = `${hours}:${minutes}`
        dispatch(setBasket(data))
    }
    const cancel = (index) => {
        dispatch(cancelOrder(index))
    }

    let id
    if(localStorage.getItem('id')){
        id=localStorage.getItem('id')
    }
    else{
        id=1
    }

    const end = () => {
        dispatch(setOrders({ arr: basket, success: false, id:id }))
        id++
        localStorage.setItem('id', id)
        setPrice(foods[0].price)
        dispatch(setQuantity(0))
        setSucces(true)
        setOrder(false)
    }
    const cls = () => {
        setSelect(false)
        setOrder(false)
    }
    const scs = () => {
        setSucces(false)
        setSelect(false)
        dispatch(trueSuccess(id-1))
    }

    let mebleg = quantity * price
    let noqte = String(mebleg).indexOf('.')
    if (noqte !== -1) {
        mebleg = String(mebleg).slice(0, noqte + 3)
    }

    data.quantity = quantity
    data.price = price
    data.table = table
    data.worker = worker
    data.food = food
    data.time = time
    data.cancel = 'no'
    data.mebleg = mebleg

    const orderBasket = useSelector(state => state.orderReducer.orderBasket)

    return (
        <div className="order">
            <div className="orderselect">
                <label>Masa :
                    <select disabled={select} onChange={changeTable}>
                        {
                            tables.map(item => (
                                <option value={item.masa} key={item.masa} >{item.yer}</option>
                            ))
                        }
                    </select>
                </label>
                <label>İşçi :
                    <select disabled={select} onChange={changeWorker}>
                        {
                            workers.map(item => (
                                <option value={item.name} key={item.id}>{item.name}</option>
                            ))
                        }
                    </select>
                </label>
            </div>
            {
                order ?
                    <>
                        <form>
                            <label>
                                <span>Məhsul adı :</span>
                                <select className="foods" onChange={changeFood}>
                                    {
                                        foods.map(item => (
                                            <option value={item.food} key={item.id} >{item.food}</option>
                                        ))
                                    }
                                </select>
                            </label>
                            <label>
                                <span>Miqdar :</span>
                                <input type='number' defaultValue='0' onChange={inputChange} />
                                <span>Qiymət : {price} AZN</span>
                            </label>
                            <div className="amountinfo">
                                <div>Məbləğ</div>
                                <div className="amount">{mebleg} AZN</div>
                            </div>
                            <button className="add" type="button" onClick={add} disabled={disabled} >Əlavə et</button>
                        </form>
                        <div className="orderlist">
                            <div className="listheader">
                                <span>Masa</span>
                                <span>Məhsul adı</span>
                                <span>Məbləğ</span>
                                <span>Miqdar</span>
                                <span>Vaxt</span>
                                <span>Status</span>
                                <span>Geri al</span>
                            </div>
                            {basket.map((item, index) => (
                                <div className="listitem" key={index}>
                                    <span>{item.table}</span>
                                    <span>{item.food}</span>
                                    <span>{item.mebleg} AZN</span>
                                    <span>{item.quantity}</span>
                                    {
                                        item.cancel == 'no' ?
                                            <span id="time">{item.time * item.quantity} dəq</span> :
                                            <span id="time">Imtina</span>
                                    }


                                    {
                                        item.cancel == 'no' ?
                                            <>
                                                <span id="cooking">Hazırlanır</span>
                                                <span onClick={() => cancel(index)}>Ləğv et</span>
                                            </>
                                            :
                                            <>
                                                <span id="canceling">Imtina</span>
                                                <span>Legv edildi</span>
                                            </>

                                    }
                                </div>
                            ))}
                            <div className="footer">
                                {
                                    basket.length > 0 ?
                                        <button className="end" onClick={end} type="button">Bitir</button> :
                                        <>
                                            <button className="close" onClick={cls}>Bağla</button>
                                        </>

                                }
                                <p>Cəmi : {cem} AZN</p>
                            </div>
                        </div>
                    </>
                    :
                    <button className="start" type='button' disabled={select} onClick={start}>Sifarişə Başla</button>
            }
            {
                success ?
                    <>
                        {orderBasket.map((item, index) => (
                            <div className="check" key={index}>
                                <span>{item.table}</span>
                                <span>{item.food}</span>
                                <span>Cəmi : {item.mebleg} AZN</span>
                            </div>
                        ))}
                        <button className="scsButton" onClick={scs}>Çatdırıldı</button>
                    </>
                    : null
            }
        </div>
    )
}

export default Order