import prisma from "../config/db.ts";

export const createUser=async(email : string , name: string)=>{
    return prisma.user.create({
        data:{email,name}
    })
}

export const getAllUsers=async()=>{
    return prisma.user.findMany({
        select:{
            id:true,
            name:true,
            email:true,
            _count:{
                select:{tasks:true}
            }
        }
    })
}