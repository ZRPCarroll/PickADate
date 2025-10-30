import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc,
  doc,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import type { Booking, TimeSlot, BookingFormData } from '../types/calendar';

const BOOKINGS_COLLECTION = 'bookings';
const SLOTS_COLLECTION = 'availableSlots';

/**
 * Fetch available time slots for a specific date range
 */
export async function fetchAvailableSlots(startDate: Date, endDate: Date): Promise<TimeSlot[]> {
  const slotsRef = collection(db, SLOTS_COLLECTION);
  const q = query(
    slotsRef,
    where('date', '>=', startDate.toISOString().split('T')[0]),
    where('date', '<=', endDate.toISOString().split('T')[0]),
    where('available', '==', true),
    orderBy('date'),
    orderBy('startTime')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as TimeSlot));
}

/**
 * Create a new booking
 */
export async function createBooking(formData: BookingFormData): Promise<string> {
  const bookingData = {
    slotId: formData.selectedSlot.id,
    date: formData.selectedSlot.date,
    startTime: formData.selectedSlot.startTime,
    endTime: formData.selectedSlot.endTime,
    name: formData.name,
    email: formData.email,
    phone: formData.phone || '',
    activityType: formData.activityType,
    message: formData.message || '',
    status: 'pending',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };

  // Add booking
  const bookingsRef = collection(db, BOOKINGS_COLLECTION);
  const docRef = await addDoc(bookingsRef, bookingData);

  // Mark slot as unavailable
  const slotRef = doc(db, SLOTS_COLLECTION, formData.selectedSlot.id);
  await updateDoc(slotRef, { available: false });

  return docRef.id;
}

/**
 * Fetch bookings for admin view
 */
export async function fetchBookings(): Promise<Booking[]> {
  const bookingsRef = collection(db, BOOKINGS_COLLECTION);
  const q = query(bookingsRef, orderBy('date'), orderBy('startTime'));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate()
  } as Booking));
}

/**
 * Update booking status
 */
export async function updateBookingStatus(bookingId: string, status: string): Promise<void> {
  const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
  await updateDoc(bookingRef, { 
    status,
    updatedAt: Timestamp.now()
  });
}

/**
 * Get slots for a specific date
 */
export async function getSlotsForDate(date: string): Promise<TimeSlot[]> {
  const slotsRef = collection(db, SLOTS_COLLECTION);
  const q = query(
    slotsRef,
    where('date', '==', date),
    orderBy('startTime')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as TimeSlot));
}
