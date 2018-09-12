export class SignupForm {
  email: string;
  password: {
    pwd: string;
    confirmPwd: string;
  };
  gender: string;
  terms: boolean;

  constructor(values: Object = {}) {
    // Constructor Initialization
    Object.assign(this, values);
  }
}
