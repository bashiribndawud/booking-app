import toast, { Toaster } from "react-hot-toast";

export const RegisterValidate = (values) => {
    const errors = {};
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );
    if(!values.name){
        errors.name = toast.error('name required')
    }else if(!values.email) {
        errors.email = toast.error('email required')
    }else if(!emailRegex.test(values.email)){
        errors.email = toast.error('Invalid Email')
    }else if(!values.password) {
        errors.password = toast.error('password required')
    }


    return errors
}
