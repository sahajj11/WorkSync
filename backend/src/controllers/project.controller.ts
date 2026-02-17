import type { Request, Response } from "express";
import * as ProjectService from '../services/project.service.ts';

interface AuthRequest extends Request {
  userId: string; 
}

export const createProject=async(req:AuthRequest , res :Response)=>{
    try{
        const {name , description } = req.body
        const userId=req.userId

        if(!name || !userId ){
            res.status(400).json({error:"Project name and UserId is required"})
        }

        const project=await ProjectService.createProject(name,userId,description)
        return res.status(201).json(project)

    }catch(err){
        res.status(500).json({ error: err });
    }
}

export const getAllProjects=async(req:Request , res :Response)=>{
    try{
        const projects=await ProjectService.getAllProjects()
        res.json(projects)

    }catch(err){
        res.status(500).json({ error: err });
    }
}

export const getMyProjects = async (req: AuthRequest, res: Response) => {
  try {
    console.log(req.userId)
    const userId = req.userId; // Usually passed via query params or Auth middleware

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required to fetch projects' });
    }

    const projects = await ProjectService.getUserProjects(userId as string);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  } 
};

export const getProjectById = async (req: any, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = req.userId; // Injected by your Auth Middleware

    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    const project = await ProjectService.getProjectById(projectId, userId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found or Access Denied' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Fetch Project Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};