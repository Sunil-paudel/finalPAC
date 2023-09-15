"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import ChatbotToggleButton from '@/components/ChatbotToggleButton';

export const metadata = {
  title: "appointment Page",
  description: "This page is used for scheduling appointments",
};

const localizer = momentLocalizer(moment);

const CustomCalendar = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlotTitle, setSelectedSlotTitle] = useState('');
  
  const router = useRouter();
  const session = useSession();
  if (session.status === 'unauthenticated') {
    router?.push('/dashboard/login');
  }
  useEffect(() => {
    const fetchAppointmentTitle = async () => {
      try {
        if (session && session.data?.user.email) {
          const response = await fetch(`/api/scheduleappointments?email=${session.data.user.email}`);
          
          if (!response.ok) {
            console.error('Error fetching appointment data:', response.statusText);
            return; // Exit early if there's an error
          }
          
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    }

    fetchAppointmentTitle();
  }, [session]);

  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: null,
    end: null,
    email: session.data?.user?.email,
    // Updated line
  });

  const handleSelect = ({ start, end }) => {
    setSelectedSlotTitle('');
    setFormData({ ...formData, start, end });
    setShowForm(true);
    
  };

  
    const handleEventClick = (event) => {
      if (selectedEvent && selectedEvent._id === event._id) {
        // If the clicked event is the same as the currently selected event,
        // clear the selected event and hide the form.
        setSelectedEvent(null);
        setShowForm(true);
      } else {
        // If a different event is clicked, show its details.
        setSelectedEvent(event);
        setShowForm(false); // Hide the form
      }
    };
    


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const titleToUse = selectedSlotTitle || formData.title;
      console.log('formData:', formData);
      console.log('titleToUse:', titleToUse);

      const response = await fetch('/api/scheduleappointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, title: titleToUse }),
      });

      if (response.ok) {
        console.log('Event saved and confirmation email sent successfully');
        const newEvent = { ...formData, title: titleToUse };
        setEvents([...events, newEvent]);
        setFormData({
          title: '',
          description: '',
          start: null,
          end: null,
          email: session.data?.user?.email,
        });

        setShowForm(false);
      } else {
        console.error('Error saving event and sending confirmation email:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending event data to the server:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const handleEdit = () => {
  //   // Assuming you have a function to open an edit form
  //   // You can pass the selectedEvent data to the form for editing
  //   openEditForm(selectedEvent);
  // };
  
  const handleDelete = async (eventId) => { // Accept eventId as a parameter
    try {
      await fetch(`/api/scheduleappointments/${eventId}`, {
        method: "DELETE",
      });

      // Manually remove the deleted event from your events state
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      setSelectedEvent(false);

    } catch (err) {
      console.log(err);
    }
  };
  
   
  
  

  if (session.status === "authenticated") {
    console.log('Email:', session.data?.user?.email);

    return (

      <div style={{ height: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Appointment calender</h1>
        <h2> welcome {session.data?.user?.name}</h2>
        <Calendar
          style={{ height: '500px', width: '80%' }}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelect}
          onSelectEvent={handleEventClick}
          views={['month', 'agenda']} 
        />

        {showForm && (
          <div style={{ width: '80%', marginTop: '20px', backgroundColor: '#fff', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
            <h2 style={{ marginBottom: '10px', color: '#292626' }}>Schedule Appointment</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#292626' }}>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={selectedSlotTitle || formData.title}
                  onChange={handleChange}
                  style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#292626' }}>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#292626' }}>Start Time:</label>
                <input
                  type="datetime-local"
                  name="start"
                  value={formData.start}
                  onChange={handleChange}
                  style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#292626' }}>End Time:</label>
                <input
                  type="datetime-local"
                  name="end"
                  value={formData.end}
                  onChange={handleChange}
                  style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
              </div>
              <p value={formData.email = session.data?.user?.email}></p>
              <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Schedule</button>
            </form>
            <ChatbotToggleButton />
          </div>
        )}

{selectedEvent && (
        <div style={{ width: '80%', marginTop: '20px', backgroundColor: '#fff', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <h2 style={{ marginBottom: '10px', color: '#292626' }}>Selected Event</h2>
          <p style={{ color: '#292626' }}>Title: {selectedEvent.title}</p>
          <p style={{ color: '#292626' }}>Description: {selectedEvent.description}</p>
          <p style={{ color: '#292626' }}>Starting time: {selectedEvent.start}</p>
          <p style={{ color: '#292626' }}>Ending time: {selectedEvent.end}</p>

          {/* Edit and Delete Buttons */}
          {/* <button onClick={handleEdit} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Edit</button> */}
          <button onClick={() => handleDelete(selectedEvent._id)} style={{ backgroundColor: 'red', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
        </div>
      )}
      

        <ChatbotToggleButton />
      </div>
    );
  }
};

export default CustomCalendar;
