// Calendar and Booking Types

export interface TimeSlot {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime: string; // HH:mm format (24-hour)
  endTime: string; // HH:mm format (24-hour)
  available: boolean;
  duration: number; // minutes
}

export interface Booking {
  id: string;
  slotId: string;
  date: string; // ISO date string
  startTime: string;
  endTime: string;
  name: string;
  email: string;
  phone?: string;
  activityType: ActivityType;
  message?: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ActivityType = 
  | 'hangout'
  | 'date'
  | 'blind-date'
  | 'event-plus-one'
  | 'help-furniture'
  | 'help-tech'
  | 'other';

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

export interface AvailabilityRule {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  slotDuration: number; // minutes
  enabled: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  activityType: ActivityType;
  message?: string;
  selectedSlot: TimeSlot;
}

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  'hangout': 'Just hang out',
  'date': 'Date',
  'blind-date': 'Blind date for a friend',
  'event-plus-one': '+1 for an event',
  'help-furniture': 'Help with furniture',
  'help-tech': 'Computer/tech help',
  'other': 'Something else'
};
