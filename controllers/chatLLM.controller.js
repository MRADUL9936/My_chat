
const {GoogleGenerativeAI}=require("@google/generative-ai")
const chatMe = async (req, res) => {
    try{
  const { prompt } = req.body;
  // Access your API key (see "Set up your API key" above)

  const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 100,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro",generationConfig});
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    res.status(200).json({response :text});
  } catch (err) {
    console.error("Error in chatMe controller:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = chatMe;
