import {useMutation, useQuery } from "react-query"
import { LoginForm, RegisterForm } from "./modal";
import axios from 'axios'

const Login_Endpoint = 'https://slug-server.onrender.com/api/auth/login'
const Register_Endpoint = 'https://slug-server.onrender.com/api/auth/register'
const getProfile_Endpoint = 'https://slug-server.onrender.com/api/auth/getprofile'
const Logout_Endpoint = 'https://slug-server.onrender.com/api/auth/logout'
const update_password_endpoint = 'https://slug-server.onrender.com/api/auth/profile/update_password'

export class AuthServices {
    
    public static async signup(user:RegisterForm){
        const res = await axios.post(Register_Endpoint, user);
        return res;
    }

    public static async signin(user:LoginForm){
        const res = await axios.post(Login_Endpoint, user);
        return res;
    }

    public static async getUserProfile() : Promise<any>{
        const res = await axios.get(getProfile_Endpoint);
        return res;
    }

    public static async logout(){
        const res = await axios.get(Logout_Endpoint);
        return res;
    }

    public static async updatePassword(userId : string, password : string){
        const res = await axios.post('update password api', {userId, password});
        return res;
    }
}


// use all services
export const useSignUp = () =>  useMutation((user : RegisterForm) => AuthServices.signup(user))

export const useSignIn = () =>  useMutation((user : LoginForm) => AuthServices.signin(user))

export const useGetProfile = () =>  useQuery(['CURRENT_USER'],AuthServices.getUserProfile);

export const useLogout = () =>  useMutation(AuthServices.logout)

export const useUpdatePassword = () => useMutation((payload : {userId:string, password:string}) => AuthServices.updatePassword(payload.userId, payload.password))