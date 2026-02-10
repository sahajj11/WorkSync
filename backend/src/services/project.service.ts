import prisma from "../config/db.ts";

export const createProject = async (name: string, description?: string) => {
  return await prisma.project.create({
    data:{
        name,
        description:description ?? null
    },
  });
};

export const getAllProjects=async()=>{
    return await prisma.project.findMany({
        include:{
            _count:{
                select:{tasks:true}
            }
        }
    })
}