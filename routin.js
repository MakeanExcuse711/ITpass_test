const form = document.getElementById("form");
const input2 = document.getElementById("input2");
const ul = document.getElementById("ul");
const form2 = document.getElementById("form2");



let routin = JSON.parse(localStorage.getItem("routin"));
let count = localStorage.getItem('count');
let count2 = localStorage.getItem('count2');



if (routin) {
  routin.forEach((routin) => {
    add(routin);
  });
}
window.onload = function() {
    
    // できた日のオブジェクト
    var count_disp = document.getElementById("disp_count");  
    var count_up_btn = document.getElementById("btn_count_up");
    var reset_btn = document.getElementById("btn_reset");
    var count_value = count-0 || 0 ;

    //できなかった日のオブジェクト
    var count_disp2 = document.getElementById("disp_count2");  
    var count_up_btn2 = document.getElementById("btn_count_up2");
    var btn_2_reset = document.getElementById("btn_reset2");
    var count_value2 = count2-0 || 0 ;
    
    var percent = count_value*100/(count_value+count_value2);
    console.log(percent);
    document.documentElement.style.setProperty('--chart-per',percent+'%');
    pie.innerHTML = Math.round(percent)+'%';
    //var a = b || ’default’;
    document.getElementById('disp_count').innerHTML = count_value ;
    // カウントアップボタンクリック処理
    count_up_btn.onclick = function (){
         count_value += 1;
         count_disp.innerHTML = count_value;
         saveCount(count_value);
    };
    // カウントアップボタンのマウスダウン処理
    count_up_btn.onmousedown = function() {
         count_up_btn.style.backgroundColor = "#00FF00";
    }
    // カウントアップボタンのマウスアップ処理
    count_up_btn.onmouseup = function() {
         count_up_btn.style.backgroundColor = "";
    }


    // リセットボタンのクリック処理
    reset_btn.onclick = function (){
         count_value = 0; 
         count_disp.innerHTML = count_value;
         saveCount(count_value);
    }
    // リセットボタンのマウスダウン処理
    reset_btn.onmousedown = function() {
         reset_btn.style.backgroundColor = "#00FF00";
    }
    // リセットボタンのマウスアップ処理
    reset_btn.onmouseup = function() {
         reset_btn.style.backgroundColor = "";

    }

    //できなかった日のクリック処理
    document.getElementById('disp_count2').innerHTML = count_value2;
    // カウントアップボタンクリック処理
    count_up_btn2.onclick = function (){
         count_value2 += 1;
         count_disp2.innerHTML = count_value2;
         saveCount2(count_value2);
    };
    // カウントアップボタンのマウスダウン処理
    count_up_btn2.onmousedown = function() {
         count_up_btn2.style.backgroundColor = "#00FF00";
    }
    // カウントアップボタンのマウスアップ処理
    count_up_btn2.onmouseup = function() {
         count_up_btn2.style.backgroundColor = "";
    }


    // リセットボタンのクリック処理
    btn_2_reset.onclick = function (){
         count_value2 = 0; 
         count_disp2.innerHTML = count_value2;
         saveCount2(count_value2);
    }
    // リセットボタンのマウスダウン処理
    btn_2_reset.onmousedown = function() {
         btn_2_reset.style.backgroundColor = "#00FF00";
    }
    // リセットボタンのマウスアップ処理
    btn_2_reset.onmouseup = function() {
         btn_2_reset.style.backgroundColor = "";

    }
    //進捗状況
    var number =[4,5,7,7,3,6,8,5,8,3,7,5];
    for(i=1;i<13;i++){
    btn(i,number[i-1]);
    }

};



//即時リロードされるのを防ぐ　addEventListener("いつ","何");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});

form2.addEventListener("submit",function(event){
  routin = JSON.parse(localStorage.getItem("routin"));
  event.preventDefault();
  console.log("実行");
  div.innerHTML = "実行";
  calc(routin);
});

/*times.addEventListener("submit",function(event){
    times = JSON.parse(localStorage.getItem("times"));
    event.preventDefault();
    console.log("+1");
    div.innerHTML = "+1";
    calc_times(times);
  });*/



function calc(){
  let i = 0;
  let j = 0;
  while(routin[i]){
    if(routin[i].completed==true){
      j = j + 1;
    } 
    i = i + 1;
  }
  let k = i - j;
  var ran = Math.floor(Math.random()*4-k) + 1; 
  div.innerHTML = ran;
}


function add(todo) {
  let todoText = input2.value;
  
  if (todo) {
    todoText = todo.text;
  }
  
  if (todoText) {
    const li = document.createElement("li");

    li.innerText = todoText;
    //li.classList.add('list-group-item')

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    // li.addEventListener("右クリック") →liに右クリックした時
    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    li.addEventListener("auxclick",function(){
      li.addEventListener("keydown",function(e){
      li.innerText = todoText + e.key;
      saveData();  
      })
    })
    li.addEventListener("click", function () {
    //重複線を引くやつ toggleは切り替え
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });
    
    //
    ul.appendChild(li);
    input2.value = "";
    saveData();
  }
}

function saveCount(count){
    //const count = count;
    localStorage.setItem('count',count);
}

function saveCount2(count){
    //const count = count;
    localStorage.setItem('count2',count);
}



function saveData() {
  const lists = document.querySelectorAll("li");
  const routin = [];
  
  

  lists.forEach((li) => {
    //オブジェクトの話
    routin.push({
      //ちょっと分からない
      text: li.innerText,
      completed: li.classList.contains("text-decoration-line-through"),
      
    });
  });

  localStorage.setItem("routin", JSON.stringify(routin));
}

//進捗
function btn(num,number){

    var progress = localStorage.getItem('progress'+num);
    //達成項目数ボタン=progress_up_btn
    var progress_up_btn2 = document.getElementById("btn_progress_up"+num);
    //リセット=reset_btn
    var reset_btn2 = document.getElementById("btn_reset"+num);
    //保存値を数字にする
    var progress_value2 = progress-0 || 0 ;
    
    
    document.getElementById("meter"+num).value = progress_value2/number
    
    progress_up_btn2.onclick = function (){
        progress_value2 += 1;
        
        //meter.value = progress_value2/number;
        document.getElementById("meter"+num).value=progress_value2/number;  
    
        saveprogress(num,progress_value2);
    }
    // カウントアップボタンのマウスダウン処理
    progress_up_btn2.onmousedown = function() {
        progress_up_btn2.style.backgroundColor = "#00FF00";
    }
    // カウントアップボタンのマウスアップ処理
    progress_up_btn2.onmouseup = function() {
        progress_up_btn2.style.backgroundColor = "";
    }

    // リセットボタンのクリック処理
    reset_btn2.onclick = function (){
        progress_value2 = 0; 
        document.getElementById("meter"+num).value=progress_value2/number;
        saveprogress(num,progress_value2);
    }
    // リセットボタンのマウスダウン処理
    reset_btn2.onmousedown = function() {
        reset_btn2.style.backgroundColor = "#00FF00";
    }
// リセットボタンのマウスアップ処理
    reset_btn2.onmouseup = function() {
        reset_btn2.style.backgroundColor = "";
    }
}

function saveprogress(i,progress_value2){
   
    
    localStorage.setItem("progress"+i,progress_value2);

    
}
