import React, { useState, useEffect } from "react";
import "../dtc/usuario1/ChatBot.css";
import logo from "../../Assets/lili.png";
import logo2 from "../../Assets/lili2.png"; // Usá una imagen diferente

const ChatBot = () => {
  const [conversation, setConversation] = useState("inicio");
  const [showDialog, setShowDialog] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isLogoToggled, setIsLogoToggled] = useState(false); // Nuevo estado

  const questions = {
    inicio: {
      message: `Hola, bienvenida!<br/>Soy lili, primero que nada<br/> En que puedo ayudarte?`,
      options: ["¿Como cargar stock de un producto?", "¿Como cargar un producto?", "¿Que son los costos fijos?", "¿Quien soy?"],
    },
    comocargarstockdeunproducto: {
      message: "En realidad la despues te cuento",
      options: ["Volver"],
    },
    comocargarunproducto: {
      message: "No se no me acuerdo",
      options: ["Volver"],
    },
    quesonloscostosfijos: {
      message: "Alquiler y eso",
      options: ["¿Cómo buscar por nombre?", "¿Cómo filtrar por fecha?", "Volver"],
    },
    comobuscarpornombre: {
      message: "Para buscar por nombre, usa la barra de búsqueda en la sección 'Personas'.",
      options: ["Volver"],
    },
    comofiltrarporfecha: {
      message: "Para filtrar por fecha, selecciona un rango en el filtro de la tabla.",
      options: ["Volver"],
    },
    quiensoy: {
      message: "Soy Dtcito, naci en este 2025...",
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
