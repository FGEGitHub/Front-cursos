import React, { useState, useEffect } from "react";
import "../dtc/usuario1/ChatBot.css"; // Estilos CSS
import logo from "../../Assets/lili.png"; // Ruta de tu imagen

const ChatBot = () => {
  const [conversation, setConversation] = useState("inicio");
  const [showDialog, setShowDialog] = useState(false); // Cambiado a false inicialmente
  const [showOptions, setShowOptions] = useState(false);
  const [cumple, setCumple] = useState([]);



  const questions = {
    inicio: {
      message: `Hola, bienvenida!<br/>Soy lili, primero que nada<br/> En que puedo ayudarte?`,
      options: ["¿Como cargar stock de un producto?","¿Como cargar un producto?",  "¿Que son los costos fijos?", "¿Quien soy?"],
    },
    comocargarstockdeunproducto: {
      message:
        "En realidad la despues te cuento",
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
      message: "Soy Dtcito, naci en este 2025, la idea es aprender a contestar todas las preguntas rapidas cuando no comprendas el sistema. Proxiammente tambien ayudare a los talleristas",
      options: ["Volver"],
    },
  };

  useEffect(() => {
    // Mostrar opciones después de 10 segundos si no hay interacción
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 10000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar o cambiar de conversación
  }, [conversation]);

  const handleOptionClick = (option) => {
    const nextConversation = option
      .toLowerCase()
      .replace(/[^\w\s]/gi, "") // Elimina caracteres especiales
      .replace(/ /g, ""); // Elimina espacios
  
    if (questions[nextConversation]) {
      setConversation(nextConversation);
    } else {
      console.warn(`Conversación no encontrada: ${nextConversation}`);
      setConversation("inicio"); // Vuelve al inicio si no encuentra la conversación
    }
    setShowOptions(false);
  };

  const toggleDialog = () => setShowDialog(!showDialog); // Alternar el estado del diálogo

  // Verificamos que la conversación actual exista y tenga opciones
  const currentQuestion = questions[conversation] || questions["inicio"];
  const options = currentQuestion.options || []; // Aseguramos que siempre sea un array

  return (
    <div className="chat-container">
      {!showDialog && (
        <img
          src={logo}
          alt="Chat Logo"
          className="chat-logo floating-logo"
          onClick={toggleDialog} // Abre el diálogo al hacer clic en el logo
        />
      )}
      {showDialog && (
        <div className="chat-box">
          <div className="chat-message speech-bubble">
            <button className="close-button" onClick={toggleDialog}>
              ✖
            </button>
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
