import './style.css'
import React from 'react'
import restoran from '../../img/CC-Ganjlik-Title-Photos.png.660x440_q85_box-0,0,660,439_crop_detail.jpg'
import restoran2 from '../../img/genclik-mall.jpg'
import {
    Link
} from "react-router-dom";
import Order from '../Order/Order';
import { useDispatch } from 'react-redux';
import { setSign } from '../../store/reducers/orderReducer';

function Main() {
    const dispatch = useDispatch()
    if (localStorage.getItem('lgn') !== null) {
        dispatch(setSign(localStorage.getItem('lgn')))
    }
    return (
        <>
            <div className='container'>
                <div className='head'>
                    <h2>Görüş Restoranı</h2>
                    <button>
                        <Link to="/admin" target="_blank" >LOGIN</Link>
                    </button>
                </div>

                <div className='image'>
                    <img src={restoran} alt='Restoran' />
                    <img src={restoran2} alt='Restoran' />
                </div>
                <p>
                    Restoran 2017-ci ildən fəaliyyət göstərir. Siz həyatınızın ən unudulmaz anlarını bizimlə birgə keçirə bilərsiniz. Ailənizlə, dostlarınızla birgə gəlin, ləziz təamlarımızdan həzz alın.
                </p>
                <h4>Bizi seçdiyiniz üçün təşəkkür edirik</h4>
            </div>
            <Order />
        </>

    )
}

export default Main
