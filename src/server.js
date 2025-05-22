const express = require("express");
const axios = require("axios");
const constants = require("./config/constants");

const app = express();

app.use(express.json());

// Health check endpoint
app.post("/onboarding", async (req, res) => {
  try {
    console.log("Request received:", req.body);

    // Validate incoming data
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      console.log("Error: Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Forward data to downstream service
    console.log("Forwarding data to downstream service...");
    const dataToForward = {
      firstName,
      lastName,
      email,
    };
    const downstreamResponse = await axios.post(
      constants.DATA_INGESTION_URL,
      dataToForward,
      {
        timeout: constants.DATA_INGESTION_TIMEOUT,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Downstream response status:", downstreamResponse.status);
    console.log("Downstream response data:", downstreamResponse.data);

    // Return success response
    return res.status(200).json({
      message: "Onboarding data successfully processed",
      status: "success",
    });
  } catch (error) {
    console.error("Error processing onboarding request:", error.message);

    // Check if the error is from the downstream service
    if (error.response) {
      console.error("Downstream service error:", {
        status: error.response.status,
        data: error.response.data,
      });
    }

    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Start the server
app.listen(constants.PORT, () => {
  console.log(`Server is running on port ${constants.PORT}`);
});
