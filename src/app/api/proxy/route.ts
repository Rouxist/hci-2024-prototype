import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint");

    // Retrieve the form data (assuming a file is being sent as 'file')
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Prepare the form data to forward to the HTTP-only API
    const formDataToForward = new FormData();
    formDataToForward.append("file", file);

    // Send the file to your HTTP API
    const apiResponse = await fetch(apiUrl + "/" + endpoint, {
      method: "POST",
      body: formDataToForward,
      // No need to set headers; fetch handles it automatically for FormData
    });

    if (!apiResponse.ok) {
      throw new Error("Failed to upload the file");
    }

    // Return response data
    const responseData = await apiResponse.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
