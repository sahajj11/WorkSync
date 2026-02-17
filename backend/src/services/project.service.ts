import prisma from "../config/db.ts";

export const createProject = async (name: string,userId: string, description?: string) => {
  return await prisma.project.create({
    data:{
        name,
        description:description ?? null,
        members:{
            create:{
                userId:userId,
                role:"OWNER"
            }
        }
    },
    include:{
        members:true
    }
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

export const getUserProjects = async (userId: string) => {
  return await prisma.project.findMany({
    where: {
      members: {
        some: { userId }
      }
    },
    include: {
      _count: { select: { tasks: true } }
    }
  });
};

export const getProjectById = async (projectId: string, userId: string) => {
  return await prisma.project.findFirst({
    where: {
      id: projectId,
      // Security: Ensure the user requesting is a member of the project
      members: {
        some: {
          userId: userId
        }
      }
    },
    include: {
      tasks: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      },
      _count: {
        select: { tasks: true }
      }
    }
  });
};