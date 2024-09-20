import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const FetchData = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const apiUrl = 'https://ken22fwu5e.execute-api.us-east-1.amazonaws.com/prod/items'; // Your API URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);

                if (response.data.errorType) {
                    throw new Error(`API Error: ${response.data.errorMessage}`);
                }

                let responseBody = response.data.body;
                if (typeof responseBody === 'string') {
                    try {
                        responseBody = JSON.parse(responseBody);
                    } catch (parseError) {
                        throw new Error('Failed to parse response body as JSON');
                    }
                }

                if (Array.isArray(responseBody)) {
                    setData(responseBody);
                } else {
                    throw new Error('Response data is not an array');
                }
            } catch (error) {
                setError(`Error: ${error.message}`);
            }
        };

        fetchData();
    }, []);

    if (error) return <div className="error">{error}</div>;
    if (data.length === 0) return <div className="loading">Loading...</div>;

    return (
        <div>
            <h1>Items from API:</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        <p>Category: {item.category}</p>
                        <p>Stock: {item.stock}</p>
                        <p>Description: {item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FetchData;
