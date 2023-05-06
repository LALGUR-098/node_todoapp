import jwt from "jsonwebtoken";
export const sendCookie=(user,res,message,statusCode=200)=>{

    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);//When a user logs in to a website, the server creates a JWT for that user, which contains encoded information about the user, such as their username and role. This JWT is then sent back to the client and stored in a cookie. On subsequent requests, the client sends the JWT along with the request to the server, and the server validates the JWT to ensure that the user is authorized to perform the requested action

    res.status(statusCode)
    .cookie("token",token, {
      httpOnly:true,
      maxAge:15*60*1000,
      sameSite:process.env.Node_ENV === "Development"? "lax":"none",
      secure:process.env.Node_ENV === "Development"? false:true,
    })
    
    .json({
      successs:true,
      message,

    });
};