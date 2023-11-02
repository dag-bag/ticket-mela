"use server";
const PATH = "/admin/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { db } from "../../../firebase.config";

async function updateForm(formData: any) {
  try {
    revalidatePath(PATH);
    const formRef = doc(db, "forms", formData.id);
    await updateDoc(formRef, {
      type: formData.type,
      label: formData.label,
      placeholder: formData.placeholder,
      category: formData.category,
      price: formData.price,
      name: formData.name,
    });

    return "Form updated successfully";
  } catch (error) {
    console.error("Error updating form: ", error);
    throw error;
  }
}

async function createForm(formData: any) {
  try {
    revalidatePath(PATH);
    const formsCollection = collection(db, "forms");
    const newForm = {
      type: formData.type,
      label: formData.label,
      placeholder: formData.placeholder,
      category: formData.category,
      price: formData.price,
      name: formData.name,
    };

    await addDoc(formsCollection, newForm);

    return "Form added successfully";
  } catch (error) {
    console.error("Error adding form: ", error);
    throw error;
  }
}

async function deleteForm(formId: string) {
  try {
    revalidatePath(PATH);
    const formRef = doc(db, "forms", formId);
    await deleteDoc(formRef);

    return "Form deleted successfully";
  } catch (error) {
    console.error("Error deleting form: ", error);
    throw error;
  }
}

export { updateForm as update, createForm as add, deleteForm as deleteFn };
