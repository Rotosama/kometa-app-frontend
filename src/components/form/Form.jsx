import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import NavLogin from '../../components/nav-login/NavLogin';
import image from '../../assets/Images/repartidor.jpg'
import Register from '../../components/register/Register';
import '../../assets/styles/form.css'

export default function Formulary() {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/');
    };

    return (
        <section className='register'>
            <div className="contenedor2">
                <div className="contenedorImagen1">
                    <img src={image} alt="" />
                </div>
                <div className="contenedorContenido1">
                    <div className="navBarUno"><NavLogin /></div>
                    <div className="contenedorFormulario1" >
                        <div className='init-title'>
                            <h2 className='title-login1'>Registro</h2>
                            <h4 className='subtitle-formulary1'>Introduce tus datos para el registro</h4>
                        </div>
                        <div className="inputs1">
                            <div>
                                <h3 className='title-input'>Nombre</h3>
                                <input className='input' value={name} onChange={(e) => setName(e.target.value)} type="text" required placeholder='Nombre' />
                            </div>
                            <div>
                                <h3 className='title-input'>Apellidos</h3>
                                <input className='input' value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" required placeholder='Apellidos' />
                            </div>
                            <div>
                                <h3 className='title-input'>Dirección</h3>
                                <input className='input' value={address} onChange={(e) => setAddress(e.target.value)} type="text" required placeholder='Dirección' />
                            </div>
                            <div>
                                <h3 className='title-input'>Correo Electrónico</h3>
                                <input className='input' value={email} onChange={(e) => setEmail(e.target.value)} type="text" required placeholder='kometa@kometa.com' />
                            </div>
                            <div>
                                <h3 className='title-input'>Contraseña</h3>
                                <input className='input' value={password} onChange={(e) => setPassword(e.target.value)} type="text" required placeholder='*************' />
                            </div>
                            <div>
                                <h3 className='title-input'>Confirmar contraseña</h3>
                                <input className='input' value={password} onChange={(e) => setPassword(e.target.value)} type="text" required placeholder='*************' />
                            </div>
                            <div className='w-33'>
                                <div className="center">
                                    <Register />
                                    <h5 className='btn-sesion'>Registro</h5>
                                </div>
                                <div className='box-log-in'>
                                    <h4 className='subtitle-log-in' onClick={navigateToLogin}>¿Ya tienes cuenta? <b>Inicia Sesión</b></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}