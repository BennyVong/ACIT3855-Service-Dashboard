import React, {useEffect, useState} from 'react';
import './App.css';
import warehouse from "./651-6517712_warehouse-clipart-icon-warehouse-icon-png-transparent.png"
import axios from 'axios';


function App(){

    const [firstInventory, setFirstInventory] = useState(undefined);
    const [stats, setStats] = useState(undefined);

    useEffect(() => {
        axios.get('http://localhost:8101/events/nth_inventory?position=0').then(response => {
            setFirstInventory(response.data);
        })
    }, []);

    const getStats = () => {
        axios.get('http://localhost:8100/report/stats').then(response => {
            setStats(response.data);
        })
    };

    useEffect(() => {
        setTimeout(getStats, 2000)
    }, [stats]);

    return (
        <div className="App">
            <header className="App-header"><img src={warehouse} className="App-logo" alt="logo" /></header>

            <h3>Number of Inventories received</h3>
            {stats && stats.num_inventory_readings}

            <h3>Number of Statuses received</h3>
            {stats && stats.num_status_readings}

            <h3>First Inventory</h3>
            {firstInventory && firstInventory.name}

            <h3>Last updated</h3>
            {stats && stats.updated_timestamp}
        </div>
    );
}

export default App;
