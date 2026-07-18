module.exports=function(req){

const key =
req.headers["x-api-key"] ||
req.query.key;


return key === process.env.API_KEY;

}
