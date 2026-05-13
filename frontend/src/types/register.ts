/**
 * Data structure for register form inputs
 */
export type RegisterFormData = {
  /** Full name of the user */
  name: string;

  /** User email */
  email: string;

  /** User password */
  password: string;

  /** Password confirmation */
  confirmPassword: string;
};

