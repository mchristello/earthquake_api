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
            <h2>Lista de características</h2>
            {features.map((feature) => (
                <section key={feature.id} >
                    <div className="card">
                        <h2>Location: {feature.attributes.place}</h2>
                        <h4 style={{color: 'lightcoral'}}>Magnitude: {feature.attributes.magnitude}</h4>
                        <p>ID: {feature.id}</p>
                        <p>Time occured: {feature.attributes.time}</p>
                        { feature.attributes.comments.length > 0 ? 
                            <div>
                                <h3>Comments:</h3>
                                <ul>
                                    {feature.attributes.comments.map((comment, index) => (
                                        <li key={index}>{comment.body}</li>
                                    ))}
                                </ul>
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
