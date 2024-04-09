import React, { useState, useEffect } from "react";

function FeaturesList() {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/features")
        .then((response) => response.json())
        .then((data) => {
            setFeatures(data.data);
        })
        .catch(error => console.error('Error en la solicitud:', error));
    }, []);

    return (
        <div>
            <h2>Lista de Eventos</h2>
            {features.map((feature) => (
                <section key={feature.id} >
                    <div className="card">
                        <h2>Feature {feature.id}</h2>
                        <h3>Location: {feature.attributes.place}</h3>
                        <h4 style={{color: 'lightcoral'}}>Magnitude: {feature.attributes.magnitude}</h4>
                        <p>Time occured: {feature.attributes.time}</p>
                        { feature.attributes.comments.length > 0 ? 
                            <div>
                                <h3>Comments:</h3>
                                <ol>
                                    {feature.attributes.comments.map((comment, index) => (
                                        <li key={index}>{comment.body}</li>
                                    ))}
                                </ol>
                            </div>   
                        : null}
                        <a href={feature.links.external_url} target="_blank">Complete info here.</a><hr />
                        <a href={`/create-comment/${feature.id}`}>Add a comment to the event.</a>
                    </div>
                </section>
            ))}
        </div>
    );
}

export default FeaturesList;
