import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const JwtDecoder = () => {

    const [input, setInput] = useState("");
    const [decoded, setDecoded] = useState(null);
    const [error, setError] = useState(null);
    const jwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.signature";

    const handleDecode = () => {
        try {
            const result = decodeJWTPayload(input);
            console.log(result);
            setDecoded(result);
            setError(null);
        } catch (e) {
            setDecoded(null);
            setError("Invalid JWT format or decoding error.");
        }
    };

    // Your job is to implement this function
    function decodeJWTPayload(jwt) {
        // Write your code here
        if (typeof jwt !== "string") {
            throw new Error("Invalid JWT");
        }

        const parts = jwt.split(".");
        if (parts.length !== 3) {
            throw new Error("Invalid JWT");
        }

        let base64 = parts[1]
            .split("-").join("+")
            .split("_").join("/");

        // Fix Base64 padding
        while (base64.length % 4 !== 0) {
            base64 += "=";
        }

        let decoded;
        try {
            decoded = atob(base64);
        } catch {
            throw new Error("Invalid JWT");
        }

        try {
            return JSON.parse(decoded);
        } catch {
            throw new Error("Invalid JWT");
        }
    }

    return (
        <div className="content-container">
            <h1>JWT Decoder</h1>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                cols={50}
                placeholder="Paste your JWT here..."
            />
            <br />
            <button onClick={handleDecode}>Decode</button>
            <div className="answer" role="region" aria-label="answer">
                {decoded && (
                    <pre>{JSON.stringify(decoded, null, 2)}</pre>
                )}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
}