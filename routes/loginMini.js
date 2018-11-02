const express=require("express");
const mysql=require("mysql");
const pool=require("../pool");
var router=express.Router();
//获取用户信息
router.get("/",(req,res)=>{
	var id=req.query.id;
	var sql="SELECT `mid`, `id`, `phone`, `email`, `user_name`, `gender`, `address` FROM `lol_mini` WHERE id=?";
	pool.query(sql,[id],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			var sql="INSERT INTO `lol_mini`(`id`) VALUES (?)";
			pool.query(sql,[id],(err,result)=>{
				if(err) throw err;
				if(result.affectedRows>0){
					var sql="SELECT `mid`, `id`, `phone`, `email`, `user_name`, `gender`, `address` FROM `lol_mini` WHERE id=?";
					pool.query(sql,[id],(err,result)=>{
						if(err) throw err;
						if(result.length>0){
							res.send(result);
						}
					})
				}
			})
		}
	});
});

//获取商品列表
router.get("/herolist",(req,res)=>{
	var sql="SELECT `pid`, `pname`, `price`, `game_currency`, `img_url`, `isSales`, `price_sale`, `type`, `hero_type`, `sale_time` FROM `lol_product` WHERE type='hero' ";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result)
		}
	});
});
router.get("/skinlist",(req,res)=>{
	var sql="SELECT `pid`, `pname`, `price`, `game_currency`, `img_url`, `isSales`, `price_sale`, `type`, `hero_type`, `sale_time` FROM `lol_product` WHERE type='skin' ";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result)
		}
	});
});

router.get("/tips",(req,res)=>{
	var hero_type=req.query.hero_type;
	var sql="SELECT `pid`, `pname`, `price`, `game_currency`, `img_url`, `isSales`, `price_sale`, `type`, `hero_type`, `sale_time` FROM `lol_product` WHERE hero_type=? ";
	pool.query(sql,[hero_type],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result)
		}
	});
});

//轮播图
router.get("/bannerlist",(req,res)=>{
	var sql="SELECT `id`, `productId`, `img_url` ,`hero_type` FROM `lol_bannerlist`";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result)
		}
	});
});

//详情页
router.get("/detail",(req,res)=>{
	var pid=req.query.pid;
	var sql="SELECT `pid`, `pname`, `price`, `game_currency`, `img_url`, `isSales`, `price_sale`, `type`, `hero_type`, `sale_time` FROM `lol_product` WHERE pid=? ";
	pool.query(sql,[pid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result)
		}
	});
});


module.exports=router;