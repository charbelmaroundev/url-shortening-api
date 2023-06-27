import * as bcrypt from 'bcrypt';

//* Hash data
const hashData = async (data: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt();

  return bcrypt.hash(data, salt);
};

export { hashData };
