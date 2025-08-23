import { formatcurrency } from "../../script/utils/money.js";
if(formatcurrency(2095)=== '20.95'){
    console.log('passed');
}else{
    console.log('failed');
}  
if(formatcurrency(2000.5==='20.01')){
    console.log("passed");
}
else{
    console.log("failed");
}
if(formatcurrency(2000.4==='20.00')){
    console.log("passed");
}
else{
    console.log("failed");
}