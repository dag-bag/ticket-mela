import axios from "axios";

export default async function shortenUrlWithTinyURL(longUrl: string) {
    const apiUrl = `http://tinyurl.com/api-create.php?url=${encodeURIComponent(
        longUrl
    )}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error shortening URL:", error);
        return null; // Handle the error as needed
    }
}
