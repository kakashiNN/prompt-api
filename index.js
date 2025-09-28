import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root test
app.get("/", (req, res) => {
  res.send("🚀 Image-to-Prompt API is running");
});

// Proxy API
app.post("/image-to-prompt", async (req, res) => {
  try {
    const { ids } = req.body; // example: ["cmg3mjr9d00f4nul8oryz1thu"]

    if (!ids) {
      return res.status(400).json({ error: "Missing ids" });
    }

    const response = await axios.post(
      "https://imageprompt.org/image-to-prompt",
      JSON.stringify(ids),
      {
        headers: {
          "authority": "imageprompt.org",
          "accept": "text/x-component",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "text/plain;charset=UTF-8",
          "cookie":
            "_ga=GA1.1.1588746716.1759058226; __gads=ID=18fc748cfcbae529:T=1759058239:RT=1759059299:S=ALNI_MZ2yA175FP8vYP17Xzx94CNFN_4DA; __gpi=UID=0000119bde4b6287:T=1759058239:RT=1759059299:S=ALNI_MapJO94tCkf47yzcpUeP79ZRZzVJw; __eoi=ID=520d059cfe48d346:T=1759058239:RT=1759059299:S=AA-Afja_0lnuKgcUZCg8Vc3S72Te; google_oauth_state=%7B%22state%22%3A%22QgjcGPZtQkhwYriY2B_7tLw1yZGRDYk0_Z0YOeE8bf8%22%2C%22redirectUri%22%3A%22%2Fimage-to-prompt%22%2C%22initial_referer%22%3A%22%22%7D; code_verifier=K-k_oVT__9pHHjxV9ddSNKtPsPjsufQI5xN4NgdbgQ8; auth_session=mjposqw4cr20vjhhbil17zeklfnre1v4pouh0q22; FCNEC=%5B%5B%22AKsRol8gC3WbnZKLJpa29b9lNcZsoAle6accNPrrJFHjqcrEFK4jI-7aHnH13CvKRzVZs3VZy0R3-KQ9atBOzUFIeiD4YjUR6Jl4dhfUjgUrUaZUv5kYmEAjkEe9RrvSnASSHkoQPN0PkpgbpoRiR1sO_j2WFzQczA%3D%3D%22%5D%5D; _ga_5BZKBZ4NTB=GS2.1.s1759058226$o1$g1$t1759059409$j41$l0$h0",
          "origin": "https://imageprompt.org",
          "pragma": "no-cache",
          "referer": "https://imageprompt.org/image-to-prompt",
          "sec-ch-ua": "\"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
        }
      }
    );

    res.json({
      success: true,
      data: response.data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
