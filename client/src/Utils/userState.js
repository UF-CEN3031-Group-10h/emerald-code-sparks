import { createGlobalState } from 'react-hooks-global-state';

// Get the role of user from the session storage
export const getCurrUser = () => {
  const result = JSON.parse(sessionStorage.getItem('user'));
  if (!result) {
    return {
      role: 'DefaultUser',
    };
  }
  var obj = Object();
  if (!result.role) {
    // return {
    //   role: 'Student',
    // };
    obj.role = 'Student';
  } else if (result.role.type === 'content_creator') {
    // return {
    //   role: 'ContentCreator',
    //   name: result.role.name,
    // };
    obj.role = 'ContentCreator';
    obj.name = result.role.name;
  } else if (result.role.type === 'researcher') {
    // return {
    //   role: 'Researcher',
    //   name: result.role.name,
    // };
    obj.role = 'Researcher';
    obj.name = result.role.name;
  } else if (result.role.type === 'authenticated') {
    // return {
    //   role: 'Mentor',
    //   name: result.role.name,
    // };
    obj.role = 'Mentor';
    obj.name = result.role.name;
  } else if (result.role.type === 'admin') {
    // return {
    //   role: 'Admin',
    //   name: result.role.name,
    // };
    obj.role = 'Admin';
    obj.name = result.role.name;
    // email
    obj.email = result.role.email;
  }
  if (!(result.organization === null)) {
    try
    {obj.org = Object()
    obj.org.Name = result.organization.Name;
    obj.org.id = result.organization.id
    obj.org.IsAdmin = result.organization.admins.map((admin) => { return admin.id }).includes(result.id)
      obj.org.IsOwner = result.organization.owner.id === result.id
    }
    catch (error)
    {
      console.log(error)
      console.log(result.organization)
      obj.org = "ERROR"
    }
  }
  return obj;
};

const { setGlobalState, useGlobalState } = createGlobalState({
  currUser: getCurrUser(),
});

export const setUserState = (s) => {
  setGlobalState('currUser', s);
};

export { useGlobalState };
