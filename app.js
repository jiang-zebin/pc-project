const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const hero=require("./routes/hero");
const register=require("./routes/register");
const login=require("./routes/login");
const loginMini=require("./routes/loginMini");
var app=express();
var server=app.listen(3000);
app.use(cors({
	origin:'http://localhost:8080',
	credentials:true
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use("/hero",hero);
app.use("/register",register);
app.use("/login",login);
app.use("/loginMini",loginMini);