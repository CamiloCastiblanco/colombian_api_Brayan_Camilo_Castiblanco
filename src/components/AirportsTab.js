import React, { useEffect, useState } from 'react';
import axios from 'axios';

function groupAirportsByDepartmentAndCity(airports) {
    const grouped = airports.reduce((acc, airport) => {
        const { department, city } = airport;
        if (!acc[department]) {
            acc[department] = {};
        }
        if (!acc[department][city]) {
            acc[department][city] = { count: 0, airports: [] };
        }
        acc[department][city].count += 1;
        acc[department][city].airports.push(airport);
        return acc;
    }, {});

    return grouped;
}

function AirportsTab() {
    const [airports, setAirports] = useState([]);
    const [processedData, setProcessedData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://api-colombia.com/api/v1/Airport');
                setAirports(response.data);
                setProcessedData(groupAirportsByDepartmentAndCity(response.data));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Aeropuertos</h1>
            <h2>Cantidad de Aeropuertos: {airports.length}</h2>
            <h2>Processed Data:</h2>
            <pre>{JSON.stringify(processedData, null, 2)}</pre>
        </div>
    );
}

export default AirportsTab;