import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { Buffer } from 'buffer';

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }

        const response: any = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    prompt_a: prompt
                }
            }
        );

        const audioStream = response.audio;

        const audioBuffer = await streamToBuffer(audioStream);
        const base64Audio = audioBuffer.toString('base64');
        const audioUrl = `data:audio/wav;base64,${base64Audio}`;

        if (!isPro) {
            await increaseApiLimit();
        }
        

        return NextResponse.json({ audio: audioUrl });
    } catch (error) {
        console.log("[MUSIC_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Helper function to convert ReadableStream to Buffer
async function streamToBuffer(stream: ReadableStream): Promise<Buffer> {
    const reader = stream.getReader();
    const chunks = [];
    let done = false;
    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
            chunks.push(value);
        }
    }
    return Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));
}
