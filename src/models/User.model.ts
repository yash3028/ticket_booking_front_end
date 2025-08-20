export interface User {
  full_name: string;
  email: string;
  mobile: string;
  userrole: string;
  company_name: string | null;
  date_of_birth: Date;
  password: string;
  token: string | null;
  country_code: string,
  logo: string
}
