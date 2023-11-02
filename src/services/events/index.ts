import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.config";

interface Event {
  title: string;
  description: string;
  buttonText: string;
}

// Create a new event
export const createEvent = async (eventData: Event): Promise<string> => {
  try {
    const eventsCollection = collection(db, "events");
    const eventRef = await addDoc(eventsCollection, eventData);
    return eventRef.id;
  } catch (error) {
    console.error("Error creating event: ", error);
    throw error;
  }
};

// Read all events
export const getEvents = async (): Promise<Event[]> => {
  const eventsCollection = collection(db, "events");
  const eventsSnapshot = await getDocs(eventsCollection);
  const events: Event[] = [];
  eventsSnapshot.forEach((doc) => {
    events.push({ id: doc.id, ...doc.data() } as unknown as Event);
  });
  return events;
};
export const getEventById = async (eventId: string): Promise<Event | null> => {
  const eventRef = doc(db, "events", eventId);
  const eventDoc = await getDoc(eventRef);

  if (eventDoc.exists()) {
    return { id: eventDoc.id, ...eventDoc.data() } as unknown as Event;
  }

  return null;
};

// Update an existing event
export const updateEvent = async (
  eventId: string,
  eventData: any
): Promise<void> => {
  try {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, eventData);
  } catch (error) {
    console.error("Error updating event: ", error);
    throw error;
  }
};

// Delete an event by ID
export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    const eventRef = doc(db, "events", eventId);
    await deleteDoc(eventRef);
  } catch (error) {
    console.error("Error deleting event: ", error);
    throw error;
  }
};
