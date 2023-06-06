import { object, string, } from 'yup';

export let ValidationSchema = object({
  // password: string().required(),
  // email: string().email(),
  email: string().required("Please enter email address").email("Please enter valid email address"),
  password: string().required("Please enter your password.").min(8, "Password is too short - should be 8 characters minimum.").matches(
    RegExp("(.*[a-z].*)"),
    "Password should have a minimum of 1 lowercase letter"
  ).matches(
    RegExp("(.*[A-Z].*)"),
    "Password should have a minimum of 1 uppercase letter"
  ).matches(
    RegExp("(.*\\d.*)"),
    "Password should have a minimum of 1 digit"
  ).matches(
    RegExp('[!@#$%^&*(),.?":{}|<>]'),
    "Password should have a minimum of 1 symbol."
  ),
});