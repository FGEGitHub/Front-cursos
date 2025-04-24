import React, { useState, useEffect } from "react";
import "../dtc/usuario1/ChatBot.css";
import logo from "../../Assets/cuqui1.png";
import logo2 from "../../Assets/cuqui2.png"; // Usá una imagen diferente

const ChatBot = () => {
  const [conversation, setConversation] = useState("inicio");
  const [showDialog, setShowDialog] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isLogoToggled, setIsLogoToggled] = useState(false); // Nuevo estado
  const questions = {
    inicio: {
      message: "¡Hola, bienvenida!<br/>Soy Cuqui 😊 ¿En qué puedo ayudarte?",
      options: [
        "¿Como cargar la informacion de mi negocio?",
        "¿Como cargar un producto?",
        "¿Que son los costos fijos?",
        "¿Como registrar una venta o compra?",
        "¿Como cargar stock de un producto?",
        "¿Donde veo el stock disponible?",
        "¿Como veo cuánto dinero tengo?",
        "¿Donde veo mis informes?",
        "¿Quien soy?"
      ],
    },
    comocargarlainformaciondeminegocio: {
      message: "Andá a la sección <b>Mi negocio</b> y completá el nombre, la actividad y el domicilio de tu emprendimiento.",
      options: ["Volver"],
    },
    comocargarunproducto: {
      message: "Andá a la sección <b>Productos</b>, poné el nombre y cargá los costos variables como materia prima, envases o comisiones.",
      options: ["Volver"],
    },
    quesonloscostosfijos: {
      message: "Los <b>costos fijos</b> son gastos que pagás cada mes, como alquiler, sueldos o servicios. Se cargan en la sección <b>Costos fijos</b>.",
      options: ["Volver"],
    },
    comoregistrarunaventaocompra: {
      message: "Andá a <b>Movimientos</b> y elegí si es venta o compra. Ingresá la fecha, el producto y el monto.",
      options: ["Volver"],
    },
    comocargarstockdeunproducto: {
      message: "El stock se actualiza automáticamente cuando cargás ventas o compras desde la sección <b>Movimientos</b>.",
      options: ["Volver"],
    },
    dondeveoelstockdisponible: {
      message: "Tocá <b>Stock</b> para ver la cantidad disponible de cada producto que tenés en tu negocio.",
      options: ["Volver"],
    },
    comoveocuantodinero: {
      message: "En <b>Caja</b> ves cuánto dinero tenés disponible y los saldos por cada medio de pago: efectivo, transferencia, etc.",
      options: ["Volver"],
    },
    dondeveomisinformes: {
      message: "En la sección <b>Informes</b> podés ver todas tus compras y ventas, y filtrar por períodos.",
      options: ["Volver"],
    },
    quiensoy: {
      message: "Soy Lili, tu asistente virtual. Nací en 2025 para ayudarte a llevar mejor tu emprendimiento 💡",
      options: ["Volver"],
    },
  };
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [conversation]);

  const handleOptionClick = (option) => {
    const nextConversation = option
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/ /g, "");

    if (questions[nextConversation]) {
      setConversation(nextConversation);
    } else {
      setConversation("inicio");
    }
    setShowOptions(false);
    setIsLogoToggled(false); // Volver a imagen original al responder
  };

  const toggleDialog = () => {
    setShowDialog(!showDialog);
    setIsLogoToggled(!isLogoToggled); // Alternar imagen
  };

  const currentQuestion = questions[conversation] || questions["inicio"];
  const options = currentQuestion.options || [];

  return (
    <div className="chat-container">
      <img
        src={isLogoToggled ? logo2 : logo}
        alt="Chat Logo"
        className="chat-logo floating-logo"
        onClick={toggleDialog}
      />
  
      {showDialog && (
        <div className="chat-box">
          <div className="chat-message speech-bubble">
            <button className="close-button" onClick={toggleDialog}>✖</button>
            <p dangerouslySetInnerHTML={{ __html: currentQuestion.message }}></p>
            {options.length > 0 && (
              <ul>
                {options.map((option, index) => (
                  <li key={index} onClick={() => handleOptionClick(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
