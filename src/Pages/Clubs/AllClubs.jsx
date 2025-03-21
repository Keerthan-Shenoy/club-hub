import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AllClubs = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    const handleClick = (id) => {
        navigate(`/clubs/${id}`);
    }
    useEffect(() => {
        axios.get('http://localhost:5050/clubs')
            .then(response => {
                console.log(response.data);
                setEvents(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });
    }, []);

    return (
        <div className="home-page">
            <div className="heading">
                <h1>Explore the Clubs</h1>
                <p>Discover clubs from various options which suits you!</p>
            </div>
            <div 
                className="events-container">
                {events.map((event) => (
                    <div key={event.clubId} className="event-card" onClick={() => {handleClick(event.clubId)}}>
                        <img src={`https://picsum.photos/400/200?random=${event.clubId}`} alt="Event" />
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                    </div>
                
                ))}
            </div>
        </div>
    );
};

export default AllClubs;
