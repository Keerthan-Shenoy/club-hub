import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HomePage.css';
import Footer from '../../components/NavBar/Footer';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';

const HomePage = () => {
const navigate = useNavigate();
const { user } = useContext(UserContext);
const [events, setEvents] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:5050/')
          .then(response => {
              console.log(response.data);
              setEvents(response.data);
          })
          .catch(error => {
              console.error('There was an error fetching the events!', error);
          });
  }, []);

  const handleJoin = (event_id) => {
    if(user.name == ""){
      alert("SignIn before joining the event")
      navigate('/signin')
    }
    else{
      axios.post('http://localhost:5050/join', { user_id: user.id, event_id: event_id }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          navigate('/');
        } 
        else {
          alert("You have already joined the event");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("You have already joined the event");
      });
    }
  }
  const featuredEvents = events.slice(0, 3);
  const regularEvents = events.slice(3);

  return (
    <div className="home-page">
      <div className="heading">
        <h1>Welcome to Club Hub</h1>
        <p>Discover events from various clubs happening around you!</p>
      </div>
      <div className="carousel-container">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={5000}
        >
          {featuredEvents.map((event) => (
            <div key={event.id} className="carousel-slide">
              <img src={`https://picsum.photos/800/400?random=${event.event_id}`} />
              <div className="carousel-caption">
                <h2>{event.club_name}</h2>
                <h3>{event.event_name}</h3>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="events-container">
        {regularEvents.map((event) => (
          <div key={event.event_id} className="event-card">
            <img src={`https://picsum.photos/400/200?random=${event.event_id}`}/>
            <h2>{event.club_name}</h2>
            <h4>{event.event_name}</h4>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
            <button className="join-button" onClick={()=>{handleJoin(event.event_id)}}>Join Event</button>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
