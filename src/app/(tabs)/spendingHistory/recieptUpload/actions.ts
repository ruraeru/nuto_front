"use server";

import { IinitialState, RecieptType } from "@/types/recieptType";
import { formatImageForGemini } from "@/lib/gemini";
import {
  GenerateContentResult,
  GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export default async function questionGemini(
  prevState: IinitialState,
  formData: FormData
) {
  {
    const data = {
      imagePart: formData.get("imagePart") as File | null,
      prompt: formData.get("prompt") as string | null,
    };

    if (data.imagePart instanceof File) {
      const { photoData, imageType, base64Data } = await processImage(
        data.imagePart
      );
      const imageData = await formatImageForGemini(base64Data, imageType);

      const result = await model.generateContent(
        base64Data ? [prompt, imageData] : prompt
      );

      const output = await extractOutput(result);

      if (output) {
        return {
          output,
          prompt: "",
        };
      }

      return {
        output: null,
        prompt: "",
        error: "JSON Code Block Not Found.",
      };
    }
    return {
      output: null,
      prompt: "",
    };
  }
}

async function processImage(file: File) {
  const photoData = await file.arrayBuffer();
  const imageType = file.type;
  const base64Data = Buffer.from(photoData).toString("base64");
  return { photoData, imageType, base64Data };
}

const prompt = `
      View an image and extract values in JSON format. 
      if price 16,500 -> 16500
      Let me show you an example 
      { 
       storeName: "Store Name",
       address: "Address",
       purchaseDate: "YYYY-MM-DD HH:MM:SS",
       totalAmount: totalAmount,
       category: ["식비", "쇼핑"]
     }, 
`;

async function extractOutput(
  result: GenerateContentResult
): Promise<RecieptType | null> {
  const res = result.response;
  const output = res.text();
  const match = output.match(/`json\n([\s\S]*)\n`/);

  if (match && match[1]) {
    return JSON.parse(match[1]);
  }
  return null;
}
