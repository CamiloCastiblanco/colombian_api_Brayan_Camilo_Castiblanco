import React, { useEffect, useState } from 'react';
import axios from 'axios';

function groupPresidentsByParty(presidents) {
    const grouped = presidents.reduce((acc, president) => {
        const party = president.party;
        if (!acc[party]) {
            acc[party] = 0;
        }
        acc[party] += 1;
        return acc;
    }, {});

    return Object.entries(grouped)
        .map(([party, count]) => ({ party, count }))
        .sort((a, b) => b.count - a.count);
}

function PresidentsTab() {
    const [presidents, setPresidents] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://api-colombia.com/api/v1/President');
                setPresidents(response.data);
                setProcessedData(groupPresidentsByParty(response.data));
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
            <h1>Presidentes</h1>
            <h2>Cantidad de Presidentes: {presidents.length}</h2>
            <h2>Processed Data:</h2>
            <pre>{JSON.stringify(processedData, null, 2)}</pre>
        </div>
    );
}

export default PresidentsTab;