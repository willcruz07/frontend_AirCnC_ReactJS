import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import API from '../../services/api';

import './styles.css'

export default function Dashboard() {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:3333', {            
            withCredentials: true,
            extraHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Access-Control-Allow-Methods", "Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept"],
        });
    }, []);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');

            const response = await API.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);            
        }
        
        loadSpots();
    }, [])

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (                
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong> {spot.company} </strong>
                        <span> {spot.price ? `R$${spot.price}/dia` : `Gratuito`} </span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn"> Cadastrar novo spot </button>
            </Link>
        </>
    )
}