import type { Request, Response } from "express";
import * as ProjectService from '../services/project.service.ts';

export const createProject=async(req:Request , res :Response)=>{
    try{
        const {name , description} = req.body
        if(!name){
            res.status(400).json({error:"Project name is required"})
        }

        const project=await ProjectService.createProject(name,description)
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