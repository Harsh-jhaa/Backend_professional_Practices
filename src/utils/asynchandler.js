const asynchandler = (requestHandler) =>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}




export {asynchandler};


// this handler handles the  functions or middlewares , as they can either be executed or not, this makes the code more usuable and avoid redundancy
// const asynchandler = (fn) => async()=>{
//     try {
//         await fn(req,res,next)
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//           success: false,
//           message: error.message,
//         });
//     }
// }