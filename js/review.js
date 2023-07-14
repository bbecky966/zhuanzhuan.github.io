const btn = document.querySelector(".btn");
const con = document.querySelector(".in");
const font = document.querySelector(".contain");
const view = document.querySelector(".view");
const area = document.querySelector(".area");
const background = [
  "image/r1.png",
  "image/r2.png",
  "image/r3.png",
  "image/r4.png",
  "image/r5.png",
  "image/r6.png",
  "image/r7.png",
];

let arr = [];

con.addEventListener("input", function () {
  font.innerHTML = `${con.value.length}/100字`;
});

// localStorage.removeItem('data');
// 获取本地存储信息
function getLocal() {
  let data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(data);
  } else {
    let arr = [];
    localStorage.setItem("data", JSON.stringify(arr));
  }
}
getLocal();

let username = localStorage.getItem('now');
console.log(username);

// 渲染界面
function load() {
  arr = getLocal();
  let str = "";
  for (let i = arr.length - 1; i >= 0; i--) {
    str += `
            <div class="re">
                <div class="pic" style="background-image:url('${arr[i].random}');"></div>
                <span class="del" id='${i}'/></span>
                <h3>${arr[i].name}</h3>
                <p>${arr[i].input}</p>
                <div class="time">${arr[i].time}</div>
            </div>
        `;
  }
  con.value = "";
  view.innerHTML = str;
  font.innerHTML = `0/100字`;
}
load();

// 通过添加数组成员调整评论区
function add() {
  if (!username){
    alert("登录后即可评论");
    let text = con.value;
    text = text.split("\n")[0];
    con.value = text;
    font.innerHTML = `${con.value.length}/100字`;
    console.log(1);
    return;
  }
  if (!con.value || con.value ==="\n") {
    alert("你还什么都没有写哦");
    font.innerHTML = "0/100字";
    con.value = "";
    return;
  }
  if (con.value.length > 100) {
    alert("字数超过限制啦");
    return;
  }
  let random = Math.floor(Math.random() * background.length);
  let time = new Date();
  arr.push({
    name: username,
    input: con.value,
    time: time.toLocaleString(),
    random: background[random],
  });
  localStorage.setItem("data", JSON.stringify(arr));
  load();
}

// 通过删除数组成员来删除评论
view.onclick = function (e) {
  if (e.target.localName === "span") {
    let i = e.target.id;
    arr.splice(i, 1);
    localStorage.setItem("data", JSON.stringify(arr));
    load();
  }
};

// 通过回车发送评论
area.addEventListener("keyup",function(e){
  if(e.key === "Enter"){
    add();
  }
})
