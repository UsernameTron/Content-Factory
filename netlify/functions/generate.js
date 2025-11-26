// Netlify serverless function to proxy OpenAI API calls
// Set OPENAI_API_KEY in your Netlify environment variables

export async function handler(event) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'OPENAI_API_KEY not configured' })
    };
  }

  try {
    const { model, max_tokens, system, messages } = JSON.parse(event.body);

    // Construct OpenAI messages array
    // If system prompt is provided separately, add it as the first message
    const openAIMessages = system
      ? [{ role: 'system', content: system }, ...messages]
      : messages;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'gpt-4o',
        max_tokens: max_tokens || 4000,
        messages: openAIMessages
      })
    });

    const data = await response.json();

    // Check for OpenAI error format
    if (data.error) {
      throw new Error(data.error.message);
    }

    // Transform OpenAI response to match the format expected by frontend
    // Frontend expects: data.content[0].text
    // OpenAI returns: data.choices[0].message.content
    const transformedData = {
      content: [
        { text: data.choices[0].message.content }
      ]
    };

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(transformedData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
