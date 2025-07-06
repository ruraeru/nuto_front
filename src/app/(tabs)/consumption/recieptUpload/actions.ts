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
      Analyze if this is an income or expense transaction based on the receipt content.
      - If it's a purchase receipt, salary slip, or payment: set transactionType to "지출"
      - If it's a refund, cashback, or income receipt: set transactionType to "수입"
      - Most receipts are typically expenses, but analyze the context carefully
      
      if price 16,500 -> 16500
      Let me show you an example 
      { 
       "storeName": "Store Name",
       "address": "Address",
       "purchaseDate": "YYYY-MM-DD HH:MM:SS",
       "totalAmount": totalAmount,
       "category": ["식비", "쇼핑"],
       "recieptName": "",
       "transactionType": "수입 or 지출"
     }
     
     Always return valid JSON format with all fields included.
`;

async function extractOutput(
  result: GenerateContentResult
): Promise<RecieptType | null> {
  const res = result.response;
  const output = res.text();
  const match = output.match(/```json\n([\s\S]*)\n```/);

  if (match && match[1]) {
    try {
      const parsed = JSON.parse(match[1]);
      console.log("Parsed receipt data:", parsed);

      // 기본값 설정 (transactionType이 없는 경우)
      if (!parsed.transactionType) {
        parsed.transactionType = "지출";
      }

      return parsed;
    } catch (error) {
      console.error("JSON parsing error:", error);
      return null;
    }
  }
  return null;
}
