import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import tables from '../../JSONs/tables.json'
import workers from '../../JSONs/workers.json'
import foods from '../../JSONs/foods.json'
import './style.css'
import { cancelOrder, setBasket, setOrders } from "../../store/reducers/orderReducer";

function Order() {

    const [order, setOrder] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(foods[0].price)
    const [table, setTable] = useState(tables[0].masa)
    const [food, setFood] = useState(foods[0].food)
    const [worker, setWorker] = useState(workers[0].name)
    const [time, setTime] = useState(foods[0].time)
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch()
    const data = {}

    const start = () => {
        setOrder(!order)
    }
    const inputChange = (e) => {
        if (e.target.value > 0) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
        setQuantity(parseInt(e.target.value))
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
    const end = () => {
        dispatch(setOrders())
        setOrder(!order)
        setPrice(foods[0].price)
        setQuantity(0)
    }
    data.quantity = quantity
    data.price = price
    data.table = table
    data.worker = worker
    data.food = food
    data.time = time
    data.cancel = 'no'



    return (
        <div className="order">
            <div className="orderselect">
                <label>Masa :
                    <select disabled={order} onChange={changeTable}>
                        {
                            tables.map(item => (
                                <option value={item.masa} key={item.masa} >{item.yer}</option>
                            ))
                        }
                    </select>
                </label>
                <label>İşçi :
                    <select disabled={order} onChange={changeWorker}>
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
                                <div className="amount">{quantity * price} AZN</div>
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
                                    <span>{item.price * item.quantity} AZN</span>
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
                                <button className="end" onClick={end} type="button">{basket.length > 0 ? 'Sonlandır' : 'Ləğv et'}</button>
                                <p>Cəmi : {total} AZN</p>
                            </div>
                        </div>
                    </>
                    :
                    <button className="start" type='button' onClick={start}>Sifarişə Başla</button>
            }
        </div>
    )
}

export default Order