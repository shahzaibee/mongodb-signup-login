import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqbody = await request.json();
    console.log(reqbody);

    const { username, email, password } = await reqbody;

    // Checking if user exists

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "User already exists!",
        },
        { status: 400 }
      );
    }

    // VALIDATION of Email
    const emailValidation = () => {
      return String(email)
        .toLocaleLowerCase()
        .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
    };

    if (!emailValidation()) {
      return NextResponse.json(
        {
          error: "Email is not valid!",
        },
        { status: 400 }
      );
    }

    // Encrypting the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "Connection is Active",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
