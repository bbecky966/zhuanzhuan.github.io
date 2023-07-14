let userid = localStorage.getItem('now');
const id = document.querySelector('.id');
const exit = document.querySelector('.exit');
const signin = document.querySelector('.signin');
const signup = document.querySelector('.signup');
if(userid){
    id.innerHTML = `ID:${userid}`;
    exit.innerHTML = `退出登录`;
    signin.onclick = function(){
        return false;
    }
    exit.onclick = function(){
        localStorage.removeItem('now');
        window.location.reload();
        return false;
    }
}