import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser";
import { sendCookie } from "../utils/features.js";


export const getAllUsers = async(req,res)=>{
    // const users = await User.find({});
    // console.log(req.query);
    // res.json({
    //     success:true,
    //     users,
    // });
}; 
export const login = async(req,res,next)=> {
  try {
    const  { email,password}=req.body;
    const user = await User.findOne({ email}).select("+password");
    if(!user) return next(new ErrorHandler("invalid Email or password",400));
    
      const isMatch = await bcrypt.compare(password,user.password);
     
      if(!isMatch ) return next(new ErrorHandler("invalid Email or password",400));
      
        sendCookie(user,res,'Welcome back,${user.name}',200);
    
  } catch (error) {
    next(error);
    
  };
 
    

};

export const register =async(req,res)=>{
  try {
    const{name,email,password}=req.body;
    let user = await User.findOne({email});
   
    if(user) return next(new ErrorHandler("User Already Exist",400));

    const hashedpassword = await bcrypt.hash(password,10);//When a user creates a password, the hashing function takes the password as input and generates a fixed-length string of characters, known as a hash. This hash is then stored in the database instead of the actual password.


    user = await User.create({name,email,password: hashedpassword});
    
     sendCookie(user,res,"registered successfully",201);
    
  } catch (error) {
    next(error);
    
  };
   
    };
  

//  await User.create({
//     name,
//     email,
//     password,

//  };

//     res.json({
//         success:true,
//         message:"registered succsfully",
//     });


// export const specialFunction = (req,res)=>{
//     res.json({
//       success:true,
//       mesage:"just joking",
  
//     });
//   };
  export const  getMyProfile = (req,res)=>{
    
   
    
    res.status(200).json({
      success:true,
      user:req.user,
    });

//     const {id}=params;
//  const user=   await User.findById(id);
 

//     res.json({
//         success:true,
//         user,

//     });
};
export const logout = (req,res)=>{
  
  res.ststus(200).cookie("token","",{
    expires:new Date(Date.now()),
    sameSite:process.env.Node_ENV === "Development"? "lax":"none",
      secure:process.env.Node_ENV === "Development"? false:true,
    })
    .json({
    success:true,
    user:req.user,
  });

};
// export const UpdateUser  = async(req,res)=>{
//     const {id}=req.params;
//  const user=   await User.findById(id);
 

//     res.json({
//         success:true,
//         message: "Updated",

//     });
// };

// export const deleteUser  = async(req,res)=>{
//     const {id}=req.params;
//  const user=   await User.findById(id);
//  await user.remove();
 

//     res.json({
//         success:true,
//         message: "Deleted",

//     });
// };