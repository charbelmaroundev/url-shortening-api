const error = (message: string, exception: any): Promise<Error> => {
  throw new exception(message);
};

export { error };
