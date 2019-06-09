const req = require("request");
const fl = require("follow-redirects");
let ck = 'name=tiendungkid';
let cookie = req.cookie(ck);
let header = {
    'content-type' : 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
    'Cookie': cookie,
    'Accept': '/',
    'Connection': 'keep-alive'
};
let method = "POST";
let url = "https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=11";
let genform = ()=>{
    return {
        email: "tiendungkid2",
        pass: "Dungpro1"
    }
};
let option = {headers: header,url: url,method: method,form: genform()};
let run = ()=>{
    return new Promise((resolve,reject)=>{
        req.post(option,(err,res,body)=>{
            if (err){
                reject(err);
            }else{
                resolve({
                    res : res,
                    body: body
                });
            }
        })
    })
};
let main = async ()=>{
    let res = await run();
    console.log(res);
};
main();