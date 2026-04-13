import { connectDb } from "@/app/lib/db";
import User from "@/app/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
    const {name,email,password} = await request.json();
    console.log(name,email,password)      
    await connectDb()
    let user = await User.findOne({email})  
    if(user){
       return NextResponse.json({message:"User already exists"}, {status:400})
    }
    if(password.length < 6){
        return NextResponse.json({message:"Password must be at least 6 characters"}, {status:400})
    }
    const hashpassword = await bcrypt.hash(password, 10);
    user = new User({
        name,
        email,
        password: hashpassword
    });
    await user.save();
    return NextResponse.json({message:"User created successfully"}, {status:201});

    } catch (error) {
        return NextResponse.json({message:"Internal server error"}, {status:500})
    }
}