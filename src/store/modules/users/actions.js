export const getUsers = (usersList) => ({
  type: "@users/GET",
  usersList,
});

export const nextUrl = (nextUrl) => ({
  type: "@nextUrl/GET",
  nextUrl,
});
