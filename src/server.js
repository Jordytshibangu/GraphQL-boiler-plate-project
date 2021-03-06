import { GraphQLServer, PubSub } from 'graphql-yoga'
import { resolvers  , fragmentReplacements} from './resolvers/index'
import prisma from './prisma'

const pubsub = new PubSub()
const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',  
    resolvers,
    context(request){
        return {
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements
})

server.start(() => {
    console.log('The server is up running on prot 4000')
})