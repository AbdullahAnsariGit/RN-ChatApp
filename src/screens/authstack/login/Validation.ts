import { object, string, } from 'yup';

export let ValidationSchema = object({
  // password: string().required(),
  // email: string().email(),
  email: string().required("Please enter email address").email("Please enter valid email address"),
  password: string().required("Please enter your password.")
});