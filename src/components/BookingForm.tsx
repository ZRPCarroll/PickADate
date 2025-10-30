import { useState } from 'react';
import { createBooking } from '../services/calendarService';
import type { TimeSlot, ActivityType, BookingFormData } from '../types/calendar';
import { ACTIVITY_LABELS } from '../types/calendar';
import './BookingForm.css';

interface BookingFormProps {
  selectedSlot: TimeSlot;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BookingForm({ selectedSlot, onSuccess, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    activityType: 'hangout' as ActivityType,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const bookingData: BookingFormData = {
        ...formData,
        selectedSlot
      };

      await createBooking(bookingData);
      onSuccess();
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="booking-form-container">
      <h3>Book Your Time Slot</h3>
      <div className="selected-slot-info">
        <p><strong>Date:</strong> {selectedSlot.date}</p>
        <p><strong>Time:</strong> {selectedSlot.startTime} - {selectedSlot.endTime}</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone (optional)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label htmlFor="activityType">What would you like to do? *</label>
          <select
            id="activityType"
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
            required
          >
            {(Object.keys(ACTIVITY_LABELS) as ActivityType[]).map(type => (
              <option key={type} value={type}>
                {ACTIVITY_LABELS[type]}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Additional details (optional)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell me a bit more about what you'd like to do..."
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}
