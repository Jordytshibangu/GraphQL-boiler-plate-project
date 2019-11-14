import  bcrypt  from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashedPassword'


const Mutation = {
        async createUser(parent, { data }, { prisma }, info){
            try{
                
                const emailTaken = await prisma.exists.User({email : data.email})
                if(emailTaken){
                    throw new Error('Please enter a new Email')
                }
                const password = await hashPassword(data.password)
                const user = await prisma.mutation.createUser({ data : {
                    username : data.username,
                    email: data.email,
                    password 
                }})
                    
                    return {
                        user, token : generateToken(user.id)
                    }
            }catch(error){
                throw new Error(error)
            }    
        },
        async loginUser(parent, { data }, {prisma}, info){
            const user = await prisma.query.user( { where : { email : data.email}})

            if(!user){
                throw new Error('Unable to Authenticate')
            }
            const passwordVerified = await bcrypt.compare(data.password, user.password)

            if(passwordVerified === false){
                throw new Error('Unable to Authenticate')
            }

            return {user, token : generateToken(user.id)
        }
        },
        async updateUser(parent, {  data }, { prisma, request }, info ){
           try{ 
               const userId = getUserId(request)
               const user =  await prisma.query.user({where : { id : userId}}, info)

               if(typeof data.password === 'string'){
                    data.password = await hashPassword(data.password)
               }
               
                 return prisma.mutation.updateUser({where : { id : user.id}, data }, info)}
            catch(error){
                throw new Error(error)
            }
        },
        async deleteUser(parent, { id }, { prisma, request }, info){
            try{
                const userId = getUserId(request)
                return await prisma.mutation.deleteUser({ where : { id : userId }}, info)
            }
            catch(error){
               throw new Error(error.message)
            }

        }
    }

export { Mutation as default }