import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth-utils";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received registration request:', body);
    
    // Validate the request
    const result = registerSchema.safeParse(body);
    
    if (!result.success) {
      console.log('Validation error:', result.error);
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }
    
    const { email, password } = result.data;
    const name = result.data.name || "User";

    try {
      // Check if user already exists
      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        console.log('User already exists:', email);
        return NextResponse.json(
          { error: "User already exists" },
          { status: 409 }
        );
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create the user
      const user = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      console.log('User created successfully:', email);
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}