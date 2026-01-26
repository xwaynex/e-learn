export const getUsers = async () => {
  const users = await fetch(`${process.env.API_URL}/user`);
  return users.json();
}