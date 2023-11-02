import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../../../firebase.config";
import { revalidatePath } from "next/cache";
// Store the previous winners' phone numbers
let previousWinners: string[] = [];

export async function POST(request: Request) {
  const body = await request.json();
  const numberOfWinnersToRetrieve = body.number; // Specify the number of winners to retrieve

  try {
    // Query the database to find the phone numbers with the most occurrences
    const ticketsCollection = collection(db, "tickets");
    const q = query(ticketsCollection, orderBy("phone"));

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({
        status: 404,
        body: JSON.stringify({ message: "No ticket data found" }),
      });
    }

    // Count occurrences of phone numbers
    const phoneOccurrences: Record<string, number> =
      countPhoneOccurrences(querySnapshot);

    // Find the top phone numbers with the most occurrences
    const topPhones: string[] = findTopPhones(
      phoneOccurrences,
      numberOfWinnersToRetrieve
    );

    // Retrieve winners
    const winners: string[] = [];
    for (const topPhone of topPhones) {
      if (winners.length >= numberOfWinnersToRetrieve) {
        break;
      }

      // Check if the winner's phone number already exists in the "winners" collection
      if (
        !previousWinners.includes(topPhone) &&
        !(await winnerExists(topPhone))
      ) {
        // Retrieve the winner's name
        const winnerName = await getWinnerName(topPhone);

        // Add the winner to the "winners" collection
        await addWinnerToCollection(winnerName, topPhone);
        previousWinners.push(topPhone);
        winners.push(topPhone);
      }
    }

    return NextResponse.json({
      status: 200,
      body: JSON.stringify({ winners }),
    });
  } catch (error) {
    return NextResponse.error();
  }
}

async function winnerExists(phone: string): Promise<boolean> {
  const winnersCollection = collection(db, "winners");
  const q = query(winnersCollection, where("phone", "==", phone));
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
  return !querySnapshot.empty;
}

async function addWinnerToCollection(
  winnerName: string,
  winnerPhone: string
): Promise<void> {
  const winnersCollection = collection(db, "winners");
  await addDoc(winnersCollection, { name: winnerName, phone: winnerPhone });
}

function countPhoneOccurrences(
  querySnapshot: QuerySnapshot<DocumentData>
): Record<string, number> {
  const phoneOccurrences: Record<string, number> = {};

  querySnapshot.forEach((doc) => {
    const phone: string = doc.data().phone as string;
    phoneOccurrences[phone] = (phoneOccurrences[phone] || 0) + 1;
  });

  return phoneOccurrences;
}

function findTopPhones(
  phoneOccurrences: Record<string, number>,
  numberOfWinners: number
): string[] {
  const topPhones: string[] = [];

  for (const phone in phoneOccurrences) {
    if (topPhones.length >= numberOfWinners) {
      break;
    }

    if (!previousWinners.includes(phone)) {
      topPhones.push(phone);
    }
  }

  return topPhones;
}

async function getWinnerName(phone: string): Promise<string> {
  const ticketsCollection = collection(db, "tickets");
  const q = query(ticketsCollection, where("phone", "==", phone));
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

  if (!querySnapshot.empty) {
    const winnerName = querySnapshot.docs[0].data().name as string;
    return winnerName;
  }

  return "Unknown"; // Default value if name is not found
}
