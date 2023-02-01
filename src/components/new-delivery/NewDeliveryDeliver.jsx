import React from 'react'
import "../../assets/styles/new-delivery.css";
import image from "../../assets/Images/empty.png";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toggle from '../../assets/Images/switch-on.svg'
import PopupDelivery from '../popup-delivery/PopupDelivery';

const NewDeliveryDeliver = () => {

    const [toggle, setToggle] = useState(false)

    const navigate = useNavigate();

    const navigateToCreateOrder = () => {
        navigate('/create-order');
    };

    const showPopup = () => {
        setTimeout(() => {
            setToggle(true);
        }, 3000);

    }

    return (
        <>
            <div className='new-delivery'>
                <h4 className='title-new-delivery'>TODAVÍA NO TE HA LLEGADO NINGÚN PEDIDO</h4>
                <img className='image-empty' src={image} alt="Logo" />
                <div className='title-and-subtitle'>
                    <h4>¿Estás disponible?</h4>
                    <p className='p-crete-delivery'>Márcate como disponible y empieza a recibir pedidos.</p>
                </div>
                <div className='available'>Disponible
                    <label class="switch" onClick={() => showPopup()}>
                        <input type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            {toggle ? <PopupDelivery toggle={toggle} setToggle={setToggle}/> : null}
            </>
            )
}

            export default NewDeliveryDeliver