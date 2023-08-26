export const makeOrderNumber = () => {
  let result = "";
  const characters = "0123456789";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
