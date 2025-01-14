import React, { useEffect } from "react";
import "../../assets/styles/create-order.css";
import Navbar from "../navbar/Navbar.jsx";
import Search from "../search/Search.jsx";
import SelectorUser from "../selector-user/SelectorUser.jsx";
import { useState } from "react";
import BtnUpload from "../buttons/BtnUpload";
import BtnNext from "../buttons/BtnNext";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BtnFinish from "../buttons/BtnFinish";
import BtnBack from "../buttons/BtnBack";
import { useUserContext } from "../../context/UserContext";
import ordersAPI from "../../services/ordersAPI";
import GeocoderInput from "../geocoder-input/GeocoderInput";
import PopupUploadFile from "./PopupUploadFile";
import useLocalToken from "../../hooks/useLocalToken";

const CreateOrder = () => {
    const [description, setDescription] = useState("");
    const [origin, setOrigin] = useState([]);
    const [originAddress, setOriginAddress] = useState("");
    const [destination, setDestination] = useState([]);
    const [destinationAddress, setDestinationAddress] = useState("");
    const [weight, setWeight] = useState("");
    const [units, setUnits] = useState("");
    const [ownerCard, setOwnerCard] = useState("");
    const [card, setCard] = useState("");
    const [cvc, setCvc] = useState("");
    const [limitDate, setLimitDate] = useState("");
    const [layer, setLayer] = useState(true);
    const [popup, setPopup] = useState(false);

    const navigate = useNavigate();
    const token = useLocalToken();
    const userContext = useUserContext();

    useEffect(() => {
        if (!token) {
            return;
        }
        userContext.setToken(token);
    }, []);

    const navigateToOrder = () => {
        navigate("/order");
    };

    async function handleOrderSubmit(event) {
        const currentDate = new Date()
        const orderDetails = {
            orderDate: currentDate.toISOString(),
            orderCharge: weight * units,
            originLongitude: origin[0],
            originLatitude: origin[1],
            originAddress: originAddress,
            destinationLongitude: destination[0],
            destinationLatitude: destination[1],
            destinationAddress: destinationAddress,
            description: description
        };
        const response = await ordersAPI.postOrder(userContext.token, orderDetails);
        if (response.error) {
            console.error(response.error);
        } else {
            navigate('/order');
        }
    }

    return (
        <div>
            <Navbar />
            <SelectorUser />
            <Search />
            <div className="create-order">
                <div className="bg-create-order">
                    {layer ? (
                        <>
                            <div className="header-create-order">
                                <h1 className="title-create-order">
                                    Realiza tu pedido - Detalles
                                </h1>
                                <MdOutlineClose onClick={navigateToOrder} size="24px" />
                            </div>
                            <div className="files">
                                <BtnUpload popup={popup} setPopup={setPopup} />
                            </div>

                            <div className="inputs">
                                <div>
                                    <h3 className="title-input">Qué deseas entregar?</h3>
                                    <input
                                        className="input"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text"
                                        required
                                        placeholder="Introducir paquete"
                                    />
                                </div>

                                <div>
                                    <h3 className="title-input">Punto de Recogida</h3>
                                    <GeocoderInput
                                        reference="origin"
                                        setCoordinates={setOrigin}
                                        setAddress={setOriginAddress}
                                        placeholder="Introducir punto de recogida"
                                    />
                                </div>

                                <div>
                                    <h3 className="title-input">Punto de Entrega</h3>
                                    <GeocoderInput
                                        reference="destination"
                                        setCoordinates={setDestination}
                                        setAddress={setDestinationAddress}
                                        placeholder="Introducir punto de entrega"
                                    />
                                </div>
                                <div>
                                    <h3 className="title-input">Archivos</h3>
                                    <div className="file-section">
                                        <div className="upload-file">
                                            <MdOutlineFileUpload size="24px" color="#4062FF" />
                                        </div>
                                        <MdOutlineAdd size="24px" color="#4062FF" />
                                    </div>
                                </div>

                                <div className="small-inputs">
                                    <div>
                                        <h3 className="title-input">Peso</h3>
                                        <input
                                            className="small-input"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.valueAsNumber)}
                                            type="number"
                                            required
                                            placeholder="Introducir peso"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="title-input">Unidades</h3>
                                        <input
                                            className="small-input"
                                            value={units}
                                            onChange={(e) => setUnits(e.target.valueAsNumber)}
                                            type="number"
                                            placeholder="Introducir unidades"
                                        />
                                    </div>
                                </div>
                            </div>
                            <BtnNext onClickAction={() => setLayer(false)} />
                        </>
                    ) : (
                        <>
                            <div className="header-create-order">
                                <h1 className="title-create-order">Realiza tu pedido - Pago</h1>
                                <MdOutlineClose onClick={navigateToOrder} size="24px" />
                            </div>

                            <div className="inputs2">
                                {/* <div>
                            <h3 className='title-input'>Seleccionar Tarjeta</h3>
                            <div><FaCcVisa size='24px' color='blue' /></div>
                            <div><FaCcMastercard size='24px' color='red' /></div>
                        </div> */}

                                <div>
                                    <h3 className="title-input">Nombre Titular</h3>
                                    <input
                                        className="input"
                                        value={ownerCard}
                                        onChange={(e) => setOwnerCard(e.target.value)}
                                        type="text"
                                        required
                                        placeholder="Introducir nombre del titular"
                                    />
                                </div>

                                <div>
                                    <h3 className="title-input">Número de Tarjeta</h3>
                                    <input
                                        className="input"
                                        value={card}
                                        onChange={(e) => setCard(e.target.value)}
                                        type="text"
                                        required
                                        placeholder="Introducir número de tarjeta"
                                    />
                                </div>

                                <div className="small-inputs">
                                    <div>
                                        <h3 className="title-input">CVC</h3>
                                        <input
                                            className="small-input"
                                            value={cvc}
                                            onChange={(e) => setCvc(e.target.value)}
                                            type="text"
                                            required
                                            placeholder="Introducir CVC"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="title-input">Fecha de Caducidad</h3>
                                        <input
                                            className="small-input"
                                            value={limitDate}
                                            onChange={(e) => setLimitDate(e.target.value)}
                                            type="text"
                                            placeholder="Introducir fecha de caducidad"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="div-buttons">
                                <div className="buttons-create">
                                    <BtnBack onClickAction={() => setLayer(true)} /> <BtnFinish onClickAction={() => handleOrderSubmit()} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {popup ? <PopupUploadFile popup={popup} setPopup={setPopup} /> : null}
        </div>
    );
};

export default CreateOrder;
