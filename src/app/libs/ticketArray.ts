import customFirestoreDocIdGenerator from "./customFirestoreDocIdGenerator";
export default function ticketArrayGenerator(num: number): number[] {
    return Array.from(
        { length: num },
        (_, i) => customFirestoreDocIdGenerator() as any
    );
}