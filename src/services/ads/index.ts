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

const saveAdToFirebase = async (adData: any, imageUrl: any) => {
  try {
    // Create a reference to the "ads" collection in Firestore
    const adsCollectionRef = collection(db, "ads");

    // Add a new document to the "ads" collection with adData and the imageUrl
    await addDoc(adsCollectionRef, {
      title: adData.title,
      description: adData.description,
      imageURL: imageUrl,
    });

    console.log("Ad saved successfully!");
  } catch (error) {
    console.error("Error saving ad to Firebase:", error);
  }
};
export const createAd = async (adData: any) => {
  const storageRef = ref(storage, adData.imageURL.name);
  const uploadTask = uploadBytesResumable(storageRef, adData.imageURL);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot);
    },
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        saveAdToFirebase(adData, url);
      });
    }
  );
  console.log(adData);
};

// Update an existing ad
export const updateAd = async (adId: string, adData: any): Promise<any> => {
  try {
    const adRef = doc(db, "ads", adId);
    await updateDoc(adRef, adData);

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

    return "Ad deleted successfully";
  } catch (error) {
    console.error("Error deleting ad: ", error);
    throw error;
  }
};
