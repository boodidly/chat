export async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2:3b',
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

export async function checkOllamaConnection(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:11434/api/tags');
    return response.ok;
  } catch {
    return false;
  }
}

export async function getModelInfo() {
  try {
    const response = await fetch('http://localhost:11434/api/show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'llama2:3b',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get model info');
    }

    const data = await response.json();
    return {
      name: data.model,
      size: `${(data.size / (1024 * 1024 * 1024)).toFixed(1)}GB`,
    };
  } catch (error) {
    console.error('Error getting model info:', error);
    return null;
  }
}