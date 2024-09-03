import { Request, Response } from "express"
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

export const login = async (req: Request, res: Response) => {
  try {
    const {username, password} = req.body;
    const user = await prisma.user.findUnique({where: {username}});

    if(!user) {
      return res.status(400).json({error: 'Invalid credentials'});
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if(!isPasswordCorrect) {
      return res.status(400).json({error: 'Invalid credentials'});
    }
  
    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      gender: user.gender,
      profilePic: user.profilePic
    })

  } catch (error: any) {
    console.log("Error in login controller", error.message)
    res.status(500).json({error: 'Internal server error'});
  }
}

export const logout = async (req: Request, res: Response) => {
  try{
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message: "logged out succesfully"})
  }
  catch(error: any){
    console.log('Error in logout controller', error.message);
    res.status(500).json({error: 'External server error'});
  }
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Checking if all fields were provided.
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    // Checking if passwords matchs.
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    // Check if user already exists on DB.
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "Username already exist" });
    }

    // Hashing password.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Since property and value share same text content, it can be shorted
    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        gender,
        password: hashedPassword,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      }
    })

    if (newUser) {
      // JWT, this will be updated to cookie session afetwards
      generateToken(newUser.id, res);
      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        gender: gender,
        profilePic: newUser.profilePic
      })
    } else {
      res.status(400).json({
        error: 'Invalid data'
      })
    }

  } catch (error: any) {
    console.log('Error in signiup controller', error.mesage);
    res.status(500).json({error: 'Internal Server Error'})
  }
}

export const getCurrentUser = async(req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({where:{id: req.user.id}})

    if(!user) {
      return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      gender: user.gender,
      profilePic: user.profilePic
    });

  } catch (error: any) {
    console.log('Error in signiup controller', error.mesage);
    res.status(500).json({error: 'Internal Server Error'})
  }
}
