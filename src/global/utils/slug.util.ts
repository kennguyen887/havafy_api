import slugify from 'slugify';

export const generateSlug = (value: string, options = {}): string => {
  return slugify(value, {
    lower: true,
    strict: true,
    ...options,
  });
};

export const generateRandomString = (
  length: number,
  hasSpecialChars = true,
): string => {
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  if (hasSpecialChars) {
    characters += '!@#$%^&*()-_=+[]{}|;:,.<>?';
  }

  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
};
