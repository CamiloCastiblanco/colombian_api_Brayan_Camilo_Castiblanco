import React, { useEffect, useState } from 'react';
import axios from 'axios';

function groupTouristicAttractionsByDepartmentAndCity(attractions) {
    const grouped = attractions.reduce((acc, attraction) => {
        const { department, city } = attraction;
        if (!acc[department]) {
            acc[department] = {};
        }
        if (!acc[department][city]) {
            acc[department][city] = { count: 0, attractions: [] };
        }
        acc[department][city].count += 1;
        acc[department][city].attractions.push(attraction);
        return acc;
    }, {});

    return grouped;
}

function AttractionsTab() {
    const [attractions, setAttractions] = useState([]);
    const [processedData, setProcessedData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://api-colombia.com/api/v1/TouristicAttraction');
                setAttractions(response.data);
                setProcessedData(groupTouristicAttractionsByDepartmentAndCity(response.data));
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
            <h1>Atracciones Turísticas</h1>
            <h2>Cantidad de Atracciones: {attractions.length}</h2>
            <h2>Processed Data:</h2>
            <pre>{JSON.stringify(processedData, null, 2)}</pre>
        </div>
    );
}

export default AttractionsTab;