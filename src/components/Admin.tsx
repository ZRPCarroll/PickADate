import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { fetchBookings } from '../services/calendarService';
import type { Booking } from '../types/calendar';
import AutoTheme from './AutoTheme';
import './Admin.css';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // Availability creation form
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    duration: 60
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      if (user) {
        loadBookings();
      }
    });
    return unsubscribe;
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await fetchBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slotsRef = collection(db, 'availableSlots');
      await addDoc(slotsRef, {
        date: newSlot.date,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        duration: newSlot.duration,
        available: true,
        createdAt: Timestamp.now()
      });
      setNewSlot({ date: '', startTime: '', endTime: '', duration: 60 });
      alert('Slot created successfully!');
    } catch (error) {
      console.error('Error creating slot:', error);
      alert('Failed to create slot');
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <AutoTheme />
        <div className="admin-container">
          <div className="login-form">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <AutoTheme />
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>

        {/* Create Availability Slots */}
        <section className="admin-section">
          <h2>Create Availability Slot</h2>
          <form onSubmit={handleCreateSlot} className="slot-form">
            <input
              type="date"
              value={newSlot.date}
              onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              required
            />
            <input
              type="time"
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
              required
            />
            <input
              type="time"
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
              required
            />
            <button type="submit">Create Slot</button>
          </form>
        </section>

        {/* View Bookings */}
        <section className="admin-section">
          <h2>Bookings</h2>
          <button onClick={loadBookings} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <div className="bookings-list">
            {bookings.length === 0 ? (
              <p>No bookings yet.</p>
            ) : (
              bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <h3>{booking.name}</h3>
                  <p><strong>Date:</strong> {booking.date}</p>
                  <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
                  <p><strong>Email:</strong> {booking.email}</p>
                  {booking.phone && <p><strong>Phone:</strong> {booking.phone}</p>}
                  <p><strong>Activity:</strong> {booking.activityType}</p>
                  {booking.message && <p><strong>Message:</strong> {booking.message}</p>}
                  <p><strong>Status:</strong> <span className={`status-${booking.status}`}>{booking.status}</span></p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}
