import getUserId from '../utils/getUserId'

const Query = {
        users(parent, args , {prisma}, info){
            const opArgs = {}
            if(args.query){
                opArgs.where = {
                    OR : [{username_contains: args.query},{email_contains: args.query}]
                }
            }
            return prisma.query.users(null, info)
        },
        me(parent, args, { prisma, request}, info){
            const userId = getUserId(request)
            return prisma.query.user({
                where : {
                    id : userId
                }
            }, info)
        }
    }


export { Query as default}