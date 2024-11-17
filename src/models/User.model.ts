export interface User{
    full_name : string,
    email : string,
    mobile : string,
    user_role : string,
    company_name : string | null,
    date_of_birth : Date,
    password : string,
    token : string | null
}
