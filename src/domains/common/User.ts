export interface User {
  id?: number;
  email: string;
  type: string;
  firstName: string;
  middleName: string;
  lastName: string;
  mobile: string;
  displayPicture: string;
  lastLoggedIn: Date;
  
  emailVerificationCode?: string;
  mobileVerificationCode?: string;
  createdBy?: User;
  createdAt?: Date;
  updatedBy?: User;
  updatedAt?: Date;
}
