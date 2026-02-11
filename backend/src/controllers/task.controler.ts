import type { Request, Response } from "express";
import * as TaskService from '../services/task.service.ts';

export const createTask=async(req:Request , res :Response)=>{

    try{
        
    const {title, projectId, parentId, description, priority} = req.body

    if (!title || !projectId) {
      return res.status(400).json({ error: 'Title and Project ID are required' });
    }

    const task=await TaskService.createTask({
        title,
        projectId,
        parentId,
        description,
        priority,
    })

    return res.status(201).json(task)

}catch(err){
    res.status(500).json({ error: err });

}
}

export const getTasksByProject=async(req:Request , res :Response)=>{
    try{
        const {projectId}=req.params

        if (typeof projectId !== 'string') {
       return res.status(400).json({ error: 'Invalid or missing Project ID' });
    }
    
        const tasks=await TaskService.getProjectTasks(projectId)
        res.json(tasks)

    }catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const assignTask = async (req: Request, res: Response) => {
  try {
    const { taskId, userId } = req.body;

    if (!taskId || !userId) {
      return res.status(400).json({ error: 'Task ID and User ID are required' });
    }

    const updatedTask = await TaskService.assignTask(taskId, userId);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign task. Ensure IDs are correct.' });
  }
};