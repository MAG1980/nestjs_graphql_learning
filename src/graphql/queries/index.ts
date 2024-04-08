import gql from 'graphql-tag';

export const createUserMutation = gql`
  mutation {
    createUser(createUserData: { username: "test", displayName: "TestName" }) {
      id
      username
      displayName
    }
  }
`;

export const getAllUsersQuery = gql`
  query {
    getAllUsers {
      id
      username
      displayName
    }
  }
`;
