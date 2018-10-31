import { GraphQLInputObjectType, GraphQLID, GraphQLNonNull } from 'graphql'

const NodeIdInput = {
  name: 'NodeIdInput',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
}
export default new GraphQLInputObjectType(NodeIdInput)
