import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../firebase.config";

interface Ticket {
  id: string;
  isExpired: boolean;
  phone: string;
  type: string; // Replace with the actual type of the "type" field (e.g., "adult" or "child")
}

export async function getTicketsByPhone(phone: string): Promise<Ticket[]> {
  try {
    const ticketsCollection = collection(db, "tickets");
    const q = query(ticketsCollection, where("phone", "==", phone));

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    const tickets: Ticket[] = [];

    querySnapshot.forEach((doc) => {
      const ticketData = doc.data() as Ticket;
      tickets.push(ticketData);
    });

    return tickets;
  } catch (error) {
    // Handle the error as needed, e.g., log it or return an error response
    console.error("Error retrieving tickets by phone:", error);
    throw new Error("Failed to retrieve tickets by phone");
  }
}
