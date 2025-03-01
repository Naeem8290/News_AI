import express from 'express' ;
import { login ,register,verify } from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js';
const userRoutes = express.Router() ;




import multer from 'multer';

const Storage = multer.diskStorage({
destination :(req , file , cb)=>{
cb(null, "./public/upload"); 
},

filename : function(req,file,cb){
cb(null , Date.now()+file.originalname);

}
})


let upload = multer({

storage :Storage , 
limits :{
filesize : 1024*1024*4

}

})



userRoutes.post('/register', upload.single("pimg") , register) ;
userRoutes.post('/login' , login)
userRoutes.get('/verify', verifyToken, verify)

export default userRoutes ;