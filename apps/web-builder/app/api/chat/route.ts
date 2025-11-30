import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: `You are an expert web designer and Craft.js builder assistant.
    You help users build websites by generating components and modifying properties.
    
    For now, just respond conversationally. We will connect you to the builder actions soon.`,
  });

  return result.toTextStreamResponse();
}
