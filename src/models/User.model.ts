export interface User {
  fullName: string;
  email: string;
  mobile: string;
  userrole: string;
  companyName: string | null;
  date_of_birth: Date;
  password: string;
  token: string | null;
  country_code: string,
}
