import './BookingSuccess.css';

interface BookingSuccessProps {
  onClose: () => void;
}

export default function BookingSuccess({ onClose }: BookingSuccessProps) {
  return (
    <div className="booking-success-overlay">
      <div className="booking-success-container">
        <div className="success-icon">✓</div>
        <h2>Booking Confirmed!</h2>
        <p>Thanks for booking time with me! I'll reach out to you soon to confirm the details.</p>
        <p className="check-email">Check your email for a confirmation.</p>
        <button onClick={onClose} className="close-button">
          Got it!
        </button>
      </div>
    </div>
  );
}
