import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface ImageGenerationInput {
  prompt: string;
  quality: string;
  background: string;
  moderation: string;
  aspect_ratio: string;
  output_format: string;
  input_fidelity: string;
  number_of_images: number;
  output_compression: number;
  input_images?: string[];
  openai_api_key?: string;
}

export async function generateImage(prompt: string, inputImages?: string[]): Promise<string[]> {
  try {
    // Check if required environment variables are available
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN is not configured');
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const input: ImageGenerationInput = {
      prompt,
      quality: "auto",
      background: "auto", 
      moderation: "auto",
      aspect_ratio: "1:1",
      output_format: "png",
      input_fidelity: "low",
      number_of_images: 1,
      output_compression: 90
    };

    // Add input images if provided (using input_images as shown in the example)
    if (inputImages && inputImages.length > 0) {
      input.input_images = inputImages;
    }

    // Add OpenAI API key
    input.openai_api_key = process.env.OPENAI_API_KEY;

    console.log('Generating image with input:', { ...input, openai_api_key: '[REDACTED]' });

    const output = await replicate.run(
      "openai/gpt-image-1",
      { input }
    );

    console.log('Replicate output:', output);

    // Handle file objects with .url() method as shown in the example
    if (Array.isArray(output)) {
      return output.map((item: { url: () => string }) => item.url());
    }
    
    return [];
  } catch (error) {
    console.error('Detailed error generating image:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error: error
    });
    
    // Re-throw with more specific error message
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate image: Unknown error');
  }
}