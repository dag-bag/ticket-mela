export type Status = "loading" | "open" | "close";
export type Message =
    "entry_date_expired"
    | "alredy_expired"
    | "current_expired"
    | "not_generated"
    | null;

export interface Ticket {
    _id: string,
    isExpired: boolean,
    generatorId: string
}

export interface Response {
    generatorId: string
    ticketQuantity: number,
    paymentConfirmationStatus: "confirmed" | "cancelled",
}