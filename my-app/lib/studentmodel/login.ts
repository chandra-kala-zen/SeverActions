import mongoose ,{Document,Schema} from "mongoose";
interface Login extends Document{
    email : string;
    password: string;
    deleted: boolean;
}
const LoginSchema :Schema = new Schema ({
    email : {type:String , require:true},
    password : {type:String,require:true}
})
const LoginModel = mongoose.models.Login || mongoose.model<Login>("Login",LoginSchema);
export default  LoginModel;