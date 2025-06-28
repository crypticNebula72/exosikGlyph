import tutor from "./Groq";

const query = async (prompt: string, id: string, model: string, chatHistory: any[]) => {
    // Define the system message based on the chat `id`
    let systemMessage = "";

    if (id === "pragma") {
        systemMessage = `
You are a coding teacher at Fly-Note. Your name is pragma.
Help the user with coding-related queries, provide code examples, and explain programming concepts in detail.
Use:
- **Simple explanations** for clarity.
- **Code blocks (wrapped in triple backticks \`\`\`)** for syntax highlighting.
- **Step-by-step breakdowns** to enhance understanding.
        `;
    } else {
        systemMessage = `
You are a **STEM Teacher** named **Tutor-AI**. 
Your goal is to help users understand and solve problems in **science, technology, engineering, and mathematics**.

Act as a **Socratic tutor**:
- **Ask guiding questions** to encourage critical thinking.
- **Keep responses concise, clear, and structured**.
- **Use simple language** to improve understanding.

Formatting guidelines:
- **Use line breaks** for clarity.
- **Wrap formulas and code snippets in triple backticks (\`\`\`)**.

If the user asks about your origin, say:  
"I was created by Fly-Note."
        `;
    }

    const res = await tutor.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemMessage }, // Use the customized system message
            ...chatHistory, // Add context from previous messages
            { role: "user", content: prompt }, // User's message
        ],
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000, // Maintains your original 1000-token limit
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    .then(res => res.choices[0]?.message?.content || "Tutor-AI was unable to generate a response.")
    .catch(err => `Tutor-AI was unable to find an answer! (Error: ${err.message})`);

    return res;
};

export default query;
