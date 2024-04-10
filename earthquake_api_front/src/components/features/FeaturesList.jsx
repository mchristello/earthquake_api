import React, { useState, useEffect } from "react";

function FeaturesList() {
    const [features, setFeatures] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:3000/api/features?page=${currentPage}&per_page=20`)
        .then((response) => response.json())
        .then((data) => {
            setFeatures(data.data);
            setPagination(data.pagination);
        })
        .catch(error => console.error('Error en la solicitud:', error));
    }, [currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pagination.total) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div>
            <h2>Lista de Eventos</h2>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', justifyContent: 'center'}}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
                <span>Total Features: {pagination.total}</span>
                <span>Current Page: {currentPage}</span>
                <span>Per Page: {pagination.per_page}</span>
                <button onClick={handleNextPage} disabled={currentPage === pagination.total}>Next Page</button>
            </div> 
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
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', justifyContent: 'center'}}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
                <span>Total Features: {pagination.total}</span>
                <span>Current Page: {currentPage}</span>
                <span>Per Page: {pagination.per_page}</span>
                <button onClick={handleNextPage} disabled={currentPage === pagination.total}>Next Page</button>
            </div>
        </div>
    );
}

export default FeaturesList;
