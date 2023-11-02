import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import {
  CollectionReference,
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { db } from "../../../../firebase.config";
interface User {
  id: string;
  // Add more fields as needed
}

export async function GET() {
  const data = await getAllUsers();
  return Response.json(data);
}

async function getAllUsers(): Promise<User[]> {
  try {
    const usersCollection = collection(db, "forms"); // Replace "users" with your Firestore collection name

    const usersSnapshot = await getDocs(query(usersCollection));
    const usersData: User[] = [];

    usersSnapshot.forEach((doc) => {
      usersData.push({
        id: doc.id,
        ...doc.data(),
      } as User);
    });

    return usersData;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
}
