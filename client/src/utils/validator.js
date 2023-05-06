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


export const ValidateNewPlaces = (values) => {
 const errors = {} 
 if(!values.title){
    errors.title = toast.error('Title Required')
 }
 if(!values.address) {
    errors.address = toast.error("Address Required");
 }
 if(!values.photolink){
    errors.photolink = toast.error("Photo Link Required");
 }
  if (!values.description) {
    errors.description = toast.error("Description Required");
  }
  if(values.perk.length < 0) {
    errors.perk = toast.error("Select a perk");
  }
  
 return errors
}
