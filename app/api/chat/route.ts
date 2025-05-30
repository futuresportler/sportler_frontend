import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { message, path } = body;
    
    // Format messages for your backend API
    const messages = [
      { role: "user", content: message }
    ];
    
    // Forward request to backend API
    // const response = await axios.post(
    //   `${process.env.BACKEND_API_URL || 'http://localhost:3000'}/chat`,
    //   { messages }
    // );

    // Return response from backend
    return NextResponse.json({
      success: true,
    //   message: response.data.message || response.data.content || "I'm not sure how to respond to that."
    });
  } catch (error: any) {
    console.error("Error processing chat request:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Sorry, I encountered an error. Please try again.",
        error: error.response?.data || error.message
      },
      { status: error.response?.status || 500 }
    );
  }
}