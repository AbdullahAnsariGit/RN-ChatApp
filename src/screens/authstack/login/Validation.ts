import { object, string, number } from 'yup';

export let ValidationSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
});