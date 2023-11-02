import { query, getDocs, collection } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../../../firebase.config";

interface PhoneObject {
  phone: number;
}

function getRandomObjects(arr: PhoneObject[], count: number): PhoneObject[] {
  if (count > arr.length) {
    throw new Error("Count should not exceed the length of the array");
  }
  const selectedObjects: PhoneObject[] = [];
  const usedPhoneNumbers: Set<number> = new Set();
  while (selectedObjects.length < count) {
    const randomIndex: number = Math.floor(Math.random() * arr.length);
    const selectedObject: PhoneObject = arr[randomIndex];
    if (!usedPhoneNumbers.has(selectedObject.phone)) {
      usedPhoneNumbers.add(selectedObject.phone);
      selectedObjects.push(selectedObject);
    }
  }
  return selectedObjects;
}

export async function POST(request: Request) {
  const tickets: any = [];
  const { winnersCount } = await request.json();
  const ticket_collection = collection(db, "lottery_participants");
  const validate_query = query(ticket_collection);

  await getDocs(validate_query)
    .then((response) => {
      response.forEach((doc) => tickets.push(doc.data()));
    })
    .catch((err) => {
      console.log(err);
    });

  return NextResponse.json({
    data: getRandomObjects(sampleData, winnersCount),
  });
}

//this is sample data
const sampleData = [
  { phone: 5555555555 },
  { phone: 1234567890 },
  { phone: 9876543210 },
  { phone: 1111111111 },
  { phone: 2222222222 },
  { phone: 3333333333 },
  { phone: 4444444444 },
  { phone: 7777777777 },
  { phone: 8888888888 },
  { phone: 9999999999 },
  { phone: 5555555555 },
  { phone: 2222222222 },
  { phone: 1111111111 },
  { phone: 4444444444 },
  { phone: 1010101010 },
  { phone: 5555555555 },
  { phone: 2222222222 },
  { phone: 9090909090 },
  { phone: 1234567890 },
  { phone: 3456789012 },
  { phone: 9876543210 },
  { phone: 5555555555 },
  { phone: 2222222222 },
  { phone: 4567456745 },
  { phone: 5678567856 },
  { phone: 6789678967 },
  { phone: 7890789078 },
  { phone: 1234123412 },
  { phone: 1010101010 },
  { phone: 3456345634 },
  { phone: 1010101010 },
];
