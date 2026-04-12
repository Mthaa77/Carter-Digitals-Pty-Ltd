import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { db } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Log the submission
    console.log("📧 New contact form submission:", {
      name: data.name,
      email: data.email,
      phone: data.phone || "N/A",
      company: data.company || "N/A",
      service: data.service || "N/A",
      budget: data.budget || "N/A",
      messageLength: data.message.length,
      timestamp: new Date().toISOString(),
    });

    // Persist to database (soft fail — don't block the user)
    try {
      await db.contactSubmission.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service: data.service,
          budget: data.budget,
          message: data.message,
        },
      });
      console.log("💾 Submission saved to database successfully.");
    } catch (dbError) {
      console.error("⚠️ Database save failed (soft fail):", dbError);
    }

    return NextResponse.json({
      success: true,
      message: "Message received successfully",
      data: {
        name: data.name,
        email: data.email,
        service: data.service,
        budget: data.budget,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
