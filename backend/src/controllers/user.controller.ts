import type { Request, Response } from "express";
import * as UserService from '../services/user.service.ts';

export const createUser=async(req:Request , res: Response)=>{
    try{
        const {email , name} = req.body

        if (!email || !name) return res.status(400).json({ error: 'Email and Name are required' });

        const user=await UserService.createUser(email,name)
        res.status(201).json(user)
    }catch(err){
        res.status(500).json({ error: err });
    }
}

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};