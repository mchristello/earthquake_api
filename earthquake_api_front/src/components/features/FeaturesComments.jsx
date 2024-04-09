import React, { useState } from "react";
import { useParams } from "react-router-dom";

function CreateComment() {
    const [body, setBody] = useState("");
    const { id } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/api/features/${id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ body }),
        })
        .then((response) => {
            if (response.ok) {
            console.log("Comentario creado satisfactoriamente");
            } else {
            console.error("Error al crear el comentario");
            }
        })
        .catch((error) => console.error("Error en la solicitud:", error));
    };

    return (
        <div>
            <h2>Crear comentario</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Comentario:
                <input
                    type="text"
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    style={{ margin: '2rem'}}
                />
                </label>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default CreateComment;
