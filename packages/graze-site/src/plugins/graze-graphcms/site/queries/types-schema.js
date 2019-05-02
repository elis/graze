import gql from 'graphql-tag'

const typesSchema = gql`
{
  __schema {
    types {
      name
      kind
      fields {
        name
        type {
          name
          kind
          ofType {
            name
            kind
            ofType {
              name
            }
          }
        }
      }
    }
  }
}
`

export default typesSchema