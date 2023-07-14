const username = document.querySelector("[name=Username]");
const password = document.querySelector("[name=Password]");
const signin = document.querySelector("h2");
const pop1 = document.querySelector(".popup1");
const check1 = document.querySelector(".popup1 .check");
const pop2 = document.querySelector(".popup2");
const check2 = document.querySelector(".popup2 .check");

let user = JSON.parse(localStorage.getItem("user"));
console.log(user);

check1.addEventListener('click',function(){
    window.location.href = "index.html";
})

check2.addEventListener('click',function(){
    pop2.classList.remove("popup2a");
})

signin.addEventListener('click',function(){
    let flag1 = false;
    let flag2 = false;
    for(let i = 0 ; i < user.length ; i++){
        if(username.value === user[i].username){
            flag1 = true;
        }
        if(password.value === user[i].password){
            flag2 = true;
        }
    }
    if(flag1 && flag2){
        pop1.classList.add("popup1a");
        localStorage.setItem("now",username.value);
        // window.location.href = "index.html";
    }
    else{
        pop2.classList.add("popup2a");
    }
})