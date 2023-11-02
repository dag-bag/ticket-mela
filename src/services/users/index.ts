"use server";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { db } from "../../../firebase.config";

const update = async (user: any) => {
  revalidatePath("/admin/credentials");
  const res = await updateUser(user);
  console.log(res);
};

async function updateUser(data: any) {
  try {
    const usersCollection = doc(db, "users", data.id);
    await updateDoc(usersCollection, {
      email: data.email,
      password: data.password,
    });

    return "User updated successfully";
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
}
async function createUser(data: any) {
  try {
    const usersCollection = collection(db, "users");
    const newUser = {
      email: data.email,
      password: data.password,
      role: data.role,
    };

    // Add a new document to the "users" collection
    await addDoc(usersCollection, newUser);

    return "User added successfully";
  } catch (error) {
    console.error("Error adding user: ", error);
    throw error;
  }
}
const add = async (user: any) => {
  revalidatePath(`${process.env.NEXT_PUBLIC_URL}/admin/credentials`);
  const res = await createUser(user);
  return res;
};
const deleteFn = async (userId: string) => {
  revalidatePath("/admin/credentials");

  try {
    const userDoc = doc(db, "users", userId);
    await deleteDoc(userDoc);
    return "User deleted successfully";
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};
export { update, add, deleteFn };
