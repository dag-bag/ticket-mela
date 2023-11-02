import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase.config";
import { revalidatePath } from "next/cache";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  uploadBytes,
} from "firebase/storage";
const PATH = "/admin/ads";

// Create a new ad
// Create a new ad with image upload
export const createAd = async (adData: any) => {
  console.log(adData)
};

// Update an existing ad
export const updateAd = async (adId: string, adData: any): Promise<any> => {
  try {
    const adRef = doc(db, "ads", adId);
    await updateDoc(adRef, adData);

    // Revalidate the path
    revalidatePath(PATH);

    return { id: adId, ...adData };
  } catch (error) {
    console.error("Error updating ad: ", error);
    throw error;
  }
};

// Delete an ad by ID
export const deleteAd = async (adId: string): Promise<string> => {
  try {
    const adRef = doc(db, "ads", adId);
    await deleteDoc(adRef);

    // Revalidate the path
    revalidatePath(PATH);

    return "Ad deleted successfully";
  } catch (error) {
    console.error("Error deleting ad: ", error);
    throw error;
  }
};
