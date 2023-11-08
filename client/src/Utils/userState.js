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
  }
  if (!(result.organization === null)) {
    obj.org = result.organization.Name;
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
