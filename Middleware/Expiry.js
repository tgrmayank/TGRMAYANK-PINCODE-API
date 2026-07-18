module.exports=function(){

const today=new Date();
const end=new Date(process.env.EXPIRY_DATE);

return today <= end;

}
