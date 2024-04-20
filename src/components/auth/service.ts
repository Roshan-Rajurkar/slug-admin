import {useMutation, useQuery } from "react-query"
import { LoginForm, RegisterForm } from "./modal";
import axios from 'axios'

const Login_Endpoint = 'https://slug-server.onrender.com/api/auth/login'
const Register_Endpoint = 'https://slug-server.onrender.com/api/auth/register'
const getProfile_Endpoint = 'https://slug-server.onrender.com/api/auth/getprofile'
const Logout_Endpoint = 'https://slug-server.onrender.com/api/auth/logout'

export class AuthServices {
    
    public static async signup(user:RegisterForm){
        const res = await axios.post(Register_Endpoint, user);
        console.log(res)
        return res;
    }

    public static async signin(user:LoginForm){
        const res = await axios.post(Login_Endpoint, user);
        console.log(res)
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
}


// use all services
export const useSignUp = () =>  useMutation((user : RegisterForm) => AuthServices.signup(user))

export const useSignIn = () =>  useMutation((user : LoginForm) => AuthServices.signin(user))

export const useGetProfile = () =>  useQuery(['CURRENT_USER'],AuthServices.getUserProfile);

export const useLogout = () =>  useMutation(AuthServices.logout)
