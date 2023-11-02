import axios from "axios";

interface VerificationResult {
  status: "alredy_expired" | "current_expired" |
  "not_generated"
}

// Function to verify a ticket using the API
export async function verifyTicket(id: string): Promise<VerificationResult> {
  try {
    const response = await axios.post("/api/expire", { id });
    return response.data as VerificationResult;
  } catch (error) {
    console.error(error);
    throw new Error("API request error");
  }
}
