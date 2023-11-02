import React from "react";
import { BiDownload } from "react-icons/bi";
import { db } from "../../../../../firebase.config";
import CsvButton from "@/components/admin/csv-button";
import { QueryDocumentSnapshot, collection, getDocs } from "firebase/firestore";
export default async function LotteryPage() {
  const tickets = await fetchDocumentsForDate(parseInt("29"));
  const adultTickets = tickets.filter((t) => t.type === "adult");
  const childTickets = tickets.filter((t) => t.type === "child");
  return (
    <main className="w-full h-screen flex flex-col px-4">
      <section className="w-full text-gray-600 space-y-8">
        <div className="flex items-center justify-between py-5">
          <input type="date" className="p-2 border rounded-xl" />
          <button className="bg-black p-2 text-white rounded-xl text-sm font-medium flex gap-2 items-center">
            <BiDownload size={20} /> <CsvButton data={tickets} />
          </button>
        </div>
      </section>

      <section>
        <div className="flex gap-5 py-3">
          <h5 className="!font-mono font-semibold">
            Tickets of adult : {adultTickets.length}
          </h5>
          <h5 className="!font-mono font-semibold">
            Tickets of children : {childTickets.length}
          </h5>
        </div>
      </section>

      <section className="overflow-y-scroll w-full">
        <table className="divide-y divide-gray-200 w-full">
          <thead>
            <tr>
              {["number", "type", "id", "status"].map((title) => (
                <th
                  key={title}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((user: any, index: any) => (
              <tr key={index} className="">
                <td className="px-6 py-4 whitespace-nowrap  !font-mono">
                  {user.number || user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  !font-mono">
                  {user.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  !font-mono">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  !font-mono">
                  {user.isExpired ? "expired" : "available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

async function fetchDocumentsForDate(day: number): Promise<any[]> {
  const lotteryCollectionRef = collection(db, "tickets");
  try {
    const querySnapshot = await getDocs(lotteryCollectionRef);
    const documents: any[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      if (doc.exists()) {
        const data = doc.data();
        const entryDate = new Date(data.entry_date);
        if (entryDate.getDate() === day) {
          documents.push(data);
        }
      }
    });
    return documents;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
