import type { Request, Response } from "express";
import * as MembarService from '../services/member.service.ts';

interface AuthRequest extends Request {
  userId?: string; 
}

export const addMemberToProject=async(req:AuthRequest , res: Response)=>{
    try{
        const {projectId , role  } = req.body
        const userId=req.userId

    if (!projectId || !userId) {
      return res.status(400).json({ error: 'Project ID and User ID are required' });
    }

    const membership = await MembarService.addMemberToProject(projectId,userId,role)
    return res.status(201).json(membership)

    }catch(err){
        return res.status(500).json({message:err})
    }
}