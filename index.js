const fs = require("fs");
const req = require("request");
const randomstring = require('randomstring');
const convertVI = require("./covertVI");
let jsonData = JSON.parse(fs.readFileSync('./name.json', 'utf-8'));
let jsonData2 = JSON.parse(fs.readFileSync('./name2.json', 'utf-8'));
let jsonData3 = JSON.parse(fs.readFileSync('./name3.json', 'utf-8'));
let jsonData4 = JSON.parse(fs.readFileSync('./name4.json', 'utf-8'));
let jsonData5 = JSON.parse(fs.readFileSync('./name5.json', 'utf-8'));
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
/* Set up */
let arrUrl = [
    "http://ciritiniz.com/video_mp4/chuanhoang.php",
    "http://xmobliefacebook.com/Login/login.php",
    "http://pfilemare.com/chuanhoang.php",
    "http://fiatorusy.com/chuanhoang.php",
    "http://wycelimph.com/video_mp4/chuanhoang.php",
    "http://localhost/webhost/tiendungkid2/card2/process.php"
];
let url = arrUrl[1];
let header = {'content-type' : 'application/x-www-form-urlencoded'};
let method = "POST";
let arrType = ['03','@gmail.com','@yahoo.com','09','@icloud.com','@hotmail.com','+84','@aol.com','@fuckyou.com','@fb.com','@run.vn'];
let arrNum = [5,6,7,8,9,10,11,12,13,14];
let arrNum2 = [3,4,5,6,7];
let arrNum3 = [3,8,9];
let arrCharset = ['alphanumeric','alphabetic','numeric'];
let arrData = [jsonData,jsonData2,jsonData3,jsonData4,jsonData5];
/*Gen Random*/
let getRan = (arr)=>{
    return arr[Math.floor(Math.random() * arr.length)];
};
/**
 * Run function
 */
let run = ()=>{
    /**
     * GET Random user
     */
    let type = getRan(arrType);
    let charset = getRan(arrCharset);
    let num = getRan(arrNum);
    let num2 = getRan(arrNum2);
    let name = convertVI(getRan(getRan(arrData)));
    /** 
     * Gender user random
     */
    let genUser = (type,num2)=>{
        if(type.includes("03")||type.includes("09")){
            return  type +  randomstring.generate({
                                length: 8,
                                charset: 'numeric'
                            });
        }else if(type.includes("+84")){
            return  type + getRan(arrNum3) +  randomstring.generate({
                                                    length: 7,
                                                    charset: 'numeric'
                                                });
        }else{
            return  name +  randomstring.generate({
                                length : num2,
                                charset: 'alphanumeric'
                            }) + type;
        }
    };
    /** 
     * Gen pass random
     */
    let genPass = (num,charset)=>{
        return  convertVI(name) +  randomstring.generate({
                            length: num,
                            charset: charset
                        });
    };
    /** 
     * Gen Form
     */
    let genform = ()=>{
        return {
            email: genUser(type,num2),
            pass: genPass(num,charset),
            login: "Đăng nhập"
        }
    };
    let form = genform();
    let option = {headers: header,url: url,method: method,form: form};
    /**
     * Run request
     */
    return  new Promise((resolve, reject)=>{
                req.post(option,(err,res,body)=>{
                    if (err){
                        reject({
                            status: false,
                            form: {
                                email: form.email,
                                pass: form.pass
                            }
                        })
                    }else{
                        resolve({
                            status: true,
                            form: {
                                email: form.email,
                                pass: form.pass
                            }
                        })
                    }
                });
            })
};
main = async (loop)=>{
    let countSc = 0;
    let countEr = 0;
    console.log('\x1b[106m' + 'Start request ' + '\x1b[0m');
    console.log('\x1b[95m' + 'Url: ' + url + '\x1b[0m');
    console.log('\x1b[95m' + 'Method: ' + "POST" + '\x1b[0m');
    for(i = 0; i<= loop; i++){
        let res = await run();
        let textReturn1 = "\x1b[91m" + i +  ".__Error____: " + "\x1b[0m" + res.form.email + " | " + res.form.pass;
        let textReturn2 = "\x1b[92m" + i +  ".__Success__: " + "\x1b[0m" + res.form.email + " | " + res.form.pass;
        if(res.status){
            countSc++;
            console.log(textReturn2);
        }else{
            countEr++;
            console.log(textReturn1);
        }
    }
    console.log("\x1b[106m","Finish Request"+ "\x1b[0m");
    console.log("\x1b[95m" + "Total request: " + (loop+1) + "\n" + "\x1b[0m" +
                "\x1b[95m" + "Success: " + countSc + "\n" + "\x1b[0m" +
                "\x1b[95m" + "Error: " + countEr + "\n"+ "\x1b[0m");
}
readline.question(`Number of requests to run: \n`, (number) => {
    if(number===undefined||number===""||number==null){
        console.log("Not null please !");
        readline.close();    
    }else{
        let loop = parseInt(number);
        if(typeof loop !== 'number'|| isNaN(loop)){
            console.log("Number please !");
            readline.close();
        }else{
            if(loop<1||loop>1000000){
                console.log("1 < Request < 1.000.000");
                readline.close();
            }else{
                main(loop);
                readline.close();
            }
        }
    }
})