export const convertToBigInt = (num: string) => {
  try {
    return BigInt(num);
  } catch (error) {
    return null;
  }
};
