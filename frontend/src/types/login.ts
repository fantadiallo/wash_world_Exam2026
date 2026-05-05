/**
 * Data structure for login form inputs
 */
export type LoginFormData = {
  /** User email address */
  email: string;

  /** User password */
  password: string;
};

/**
 * Props for LoginForm component
 */
export type LoginFormProps = {
  /**
   * Optional submit handler
   * Called when the form is submitted with valid data
   */
  onSubmit?: (data: LoginFormData) => void;
};