const code = document.querySelector(".code");
const username = document.querySelector("[name=Username]");
const password = document.querySelector("[name=Password]");
const code2 = document.querySelector("[name=VerificationCode]");
const test1 = document.querySelector(".test1");
const test2 = document.querySelector(".test2");
const test3 = document.querySelector(".test3");
const signup = document.querySelector("h2");
const pop1 = document.querySelector(".popup1");
const check1 = document.querySelector(".popup1 .check");
const pop2 = document.querySelector(".popup2");
const check2 = document.querySelector(".popup2 .check");

let flag = true;
let ran;
let flag1 = false;
let flag2 = false;
let flag3 = false;

username.addEventListener('change',verifyName);
password.addEventListener('change',verifyPassword);
code2.addEventListener('change',verifyCode);

// let b = localStorage.getItem("data");
// console.log(JSON.parse(b));

check1.addEventListener('click',function(){
    window.location.href = "signin.html";
})

check2.addEventListener('click',function(){
    pop2.classList.remove("popup2a");
})

function getlocal(){
    let data = localStorage.getItem("user");
    if(data){
        return JSON.parse(data);
    }
    else{
        let user = [];
        localStorage.setItem("user", JSON.stringify(user));
    }
}
getlocal();
let userid = JSON.parse(localStorage.getItem("user"));

signup.addEventListener('click',function(){
    flag1 = verifyCode();
    flag2 = verifyName();
    flag3 = verifyPassword();
    if(flag1&&flag2&&flag3){
        let user = getlocal();
        user.push({
            username:username.value,
            password:password.value,
        });
        localStorage.setItem("user",JSON.stringify(user));
        pop1.classList.add("popup1a");
        // window.location.href = "signin.html";
    }
    else{
        pop2.classList.add("popup2a");
    }
})

code.addEventListener('click',function(){
    if(flag){
        // console.log(1);
        let random = Math.floor(Math.random()*(9000+1))+1000;
        ran = random;
        flag = false;
        code.innerHTML = 'Waiting(5s)';
        let i = 5;
        let timeiID = setInterval(function(){
        i--;
        code.innerHTML = `Waiting(${i}s)`;
        if(i <= 0){
            code.innerHTML = 'Get Code';
            clearInterval(timeiID);
            flag = true;
        }
        },1000);
        alert("您的验证码是"+random);
    }
})

function verifyName(){
    // console.log(1);
    let flagid = true;
    let reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    for(let i = 0 ; i < userid.length ; i++){
        if(username.value === userid[i].username){
            flagid = false;
        }
    }
    if(!flagid){
        test1.innerHTML = "该用户名已被使用";
        return false;
    }
    if(!reg.test(username.value)){
        test1.innerHTML = "账号需以字母开头，包含5-16个字母数字或下划线";
        return false;
    }
    if(reg.test(username.value)&&flagid){
        test1.innerHTML = "";
        return true;
    }
}

function verifyPassword(){
    console.log(1);
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if(!reg.test(password.value)){
        test2.innerHTML = "密码为8-20个大小写字母和数字组合且无特殊字符";
        return false;
    }
    if(reg.test(password.value)){
        test2.innerHTML = "";
        return true;
    }
}

function verifyCode(){
    if(+code2.value === ran){
        test3.innerHTML = "";
        return true;
    }
    if(+code2.value !== ran){
        test3.innerHTML = "验证码不正确哦";
        return false;
    }
}