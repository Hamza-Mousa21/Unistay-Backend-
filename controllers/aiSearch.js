const Groq = require("groq-sdk");
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const searchResidences = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    /* ================= GET ALL AVAILABLE RESIDENCES ================= */

    const residences = await db.Residence.findAll({
      where: { is_available: true },
      include: [{ model: db.ResidenceImage }],
    });

    /* ================= SEND TO GROQ ================= */

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `
            You are a smart residence search assistant.
            The user is searching for: "${query}"

            Here are the available residences in JSON format:
            ${JSON.stringify(residences, null, 2)}

            Instructions:
            - Read each residence description carefully
            - Return ONLY the residences that match the user's request
            - Match based on description, address, floor_num, rent_price, building_num
            - If nothing matches return an empty array []
            - Return ONLY a valid JSON array, no explanation, no markdown, no extra text
          `,
        },
      ],
    });

    /* ================= PARSE GROQ RESPONSE ================= */

    const raw = response.choices[0].message.content.trim();
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned);

    return res.status(200).json({
      success: true,
      residences: result,
    });

  } catch (error) {
    console.error("AI Search Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};