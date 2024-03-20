import {useMutation } from "react-query"
import { LoginFrom, RegisterForm } from "./modal";


class AuthServices {

    public static signup(user:RegisterForm){
        console.log(user)
        return Promise.resolve(user);
    }

    public static signin(user:LoginFrom){
        console.log(user)
        return Promise.resolve(user)
    }

    public static getUserProfile(){
        return Promise.resolve(1)
    }

    public static logout(){
        return Promise.resolve(1)
    }
}


// use all services
export const useSignUp = () =>  useMutation((user : RegisterForm) => AuthServices.signup(user))

export const useSignIn = () =>  useMutation((user : LoginFrom) => AuthServices.signin(user))
