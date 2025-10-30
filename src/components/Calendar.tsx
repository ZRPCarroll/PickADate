import { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isToday, addMonths, subMonths, startOfWeek, endOfWeek, isBefore, startOfDay } from 'date-fns';
import { fetchAvailableSlots, getSlotsForDate } from '../services/calendarService';
import type { TimeSlot } from '../types/calendar';
import './Calendar.css';

interface CalendarProps {
  onSlotSelect: (slot: TimeSlot) => void;
  selectedSlot?: TimeSlot;
}

export default function Calendar({ onSlotSelect, selectedSlot }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slotsForDate, setSlotsForDate] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch available slots for the current month
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const slots = await fetchAvailableSlots(monthStart, monthEnd);
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [currentMonth]);

  // Get calendar days (including days from prev/next month for complete weeks)
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Check if a date has available slots
  const hasAvailableSlots = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availableSlots.some(slot => slot.date === dateStr && slot.available);
  };

  // Handle date click
  const handleDateClick = async (date: Date) => {
    if (isBefore(date, startOfDay(new Date()))) return; // Can't select past dates
    if (!hasAvailableSlots(date)) return;

    setSelectedDate(date);
    const dateStr = format(date, 'yyyy-MM-dd');
    const slots = await getSlotsForDate(dateStr);
    setSlotsForDate(slots.filter(slot => slot.available));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
    setSelectedDate(null);
    setSlotsForDate([]);
  };

  return (
    <div className="calendar-container">
      {/* Month Navigation */}
      <div className="calendar-header">
        <button onClick={() => navigateMonth('prev')} className="nav-button">
          ← Previous
        </button>
        <h3 className="current-month">{format(currentMonth, 'MMMM yyyy')}</h3>
        <button onClick={() => navigateMonth('next')} className="nav-button">
          Next →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}

        {/* Calendar days */}
        {calendarDays.map(day => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isCurrentDay = isToday(day);
          const hasSlots = hasAvailableSlots(day);
          const isPast = isBefore(day, startOfDay(new Date()));
          const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              disabled={!hasSlots || isPast}
              className={`
                calendar-day
                ${!isCurrentMonth ? 'other-month' : ''}
                ${isCurrentDay ? 'today' : ''}
                ${hasSlots && !isPast ? 'has-slots' : ''}
                ${isSelected ? 'selected' : ''}
                ${isPast ? 'past' : ''}
              `}
            >
              <span className="day-number">{format(day, 'd')}</span>
              {hasSlots && !isPast && <span className="availability-indicator">●</span>}
            </button>
          );
        })}
      </div>

      {/* Time Slot Selection */}
      {selectedDate && slotsForDate.length > 0 && (
        <div className="time-slots-section">
          <h4>Available times for {format(selectedDate, 'MMMM d, yyyy')}</h4>
          <div className="time-slots-grid">
            {slotsForDate.map(slot => (
              <button
                key={slot.id}
                onClick={() => onSlotSelect(slot)}
                className={`time-slot-button ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
              >
                {slot.startTime} - {slot.endTime}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && slotsForDate.length === 0 && (
        <div className="no-slots-message">
          No available times for this date.
        </div>
      )}

      {loading && (
        <div className="calendar-loading">
          Loading availability...
        </div>
      )}
    </div>
  );
}
