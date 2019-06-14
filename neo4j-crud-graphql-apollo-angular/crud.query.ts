import graphqlTag from 'graphql-tag';

export function deleteUser(id) {
  return graphqlTag`
  mutation deleteUser {
    DeleteUser(id:"${id}") {
      id
    }
  }
  `;
}

export function addNewUser(obj) {
  return graphqlTag`
  mutation  {
    createUser(username:"${obj.username.toLowerCase()}",password:"${obj.pass}",title:"${obj.title}",full_name:"${obj.full_name}",role:"${obj.role}",created_date:"${new Date().toISOString()}") {
      id
      username
      password
      title
      full_name
      role
      created_date
    }
  }
  `;
}

export function getAllUsers() {
  return graphqlTag`
  query {
    gettAllUsers {
      id
      username
      full_name
      role
      title
      created_date
      password
    }
  }
  `
}

export function updateUserById(obj) {
  return graphqlTag`
  mutation {
    UpdateManagementUser(username:"${obj.username.toLowerCase()}",password:"${obj.password}",title:"${obj.title}",full_name:"${obj.full_name}",role:"${obj.role}",id:"${obj.id}") {
      id
      username
      full_name
      role
      title
      created_date
      password
    }
  }
  `;

}

