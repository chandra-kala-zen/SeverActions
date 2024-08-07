import mongoose ,{Document,Schema} from "mongoose";
interface Signup extends Document{
    name : string;
    email:string;
    password:string;
    deleted: boolean;
}
const SignUpSchema :Schema = new Schema ({
    name : {type:String , require:true},
    email : {type:String,require:true},
    password : {type:String,require:true}
})
const SignupModel = mongoose.models.Signup || mongoose.model<Signup>("Signup",SignUpSchema);
export default  SignupModel