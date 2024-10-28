import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { Buffer } from 'buffer';

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            console.log("[VIDEO_ERROR] Unauthorized");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            console.log("[VIDEO_ERROR] Prompt is required");
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }

        const response: any = await replicate.run(
            "cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755",
            {
                input: {
                    prompt
                }
            }
        );

        const videoStream = response[0]; // Access the first item in the array
        if (!videoStream) {
            console.log("[VIDEO_ERROR] No video stream in response");
            return new NextResponse("No video stream in response", { status: 500 });
        }

        const videoBuffer = await streamToBuffer(videoStream);
        const base64Video = videoBuffer.toString('base64');
        const videoUrl = `data:video/mp4;base64,${base64Video}`;

        await increaseApiLimit();

        return NextResponse.json({ video: videoUrl });
    } catch (error) {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Helper function to convert ReadableStream to Buffer
async function streamToBuffer(stream: any): Promise<Buffer> {
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
