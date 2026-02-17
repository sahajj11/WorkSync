import prisma from "../config/db.ts";

export const createTask = async (data: {
  title: string;
  description?: string;
  projectId: string;
  parentId?: string;
  assigneeId?: string;
  priority: string;
}) => {
  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      projectId: data.projectId,
      parentId: data.parentId ?? null,
      assigneeId: data.assigneeId ?? null,
      priority: data.priority ?? null,
    },
    include: {    
      subtasks: true, // Return subtasks if any exist (usually empty on create) 
      assignee:{
        select:{name:true , email :true}
      }
    },
    
  });
};

export const getProjectTasks=async(projectId:string)=>{
  return await prisma.task.findMany({
    where:{
      projectId,
      
    },
    include:{
      subtasks:{
        include:{
          subtasks:true
        }
      }
    }
  })
}

export const assignTask = async (taskId: string, userId: string) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: { assigneeId: userId },
    include: {
      assignee: { select: { name: true } }
    }
  });
};