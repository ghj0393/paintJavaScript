const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// 처음 바탕화면 색 기본 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
// 캔버스안에서 픽셀을다룸
ctx.lineWidth = 2.5;

// 페인팅 기본값
let painting = false;
// 배경 채울 때 구분하는 변수
let filling = false;

function stopPainting(){
   painting = false; 
}

function startPainting(){
    painting = true;
}

// 마우스를 움직이는 내내 발생한다.
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // 마우스를 클릭하지 않았을 때
    if(!painting){
        // 선을 만든다-- 선을 만들기만 할뿐 사용x
        ctx.beginPath();
        // 움직일때마다 좌표를 저장
        ctx.moveTo(x, y);
    }
    // 마우스를 클릭했을 때
    else{
        // 움직이고 있는 해당 좌표에 선을 만든다.
        // 현재의 sub-path에서 마지막 지점을 특정 좌표로 연결한다.
        ctx.lineTo(x, y);
        // 획을 긋는다.
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    // 색상 클릭하면 배경색도 저장해놓기
    ctx.fillStyle = color;
}
// 브러쉬 조절 메서드 input메서드 받아서 실행
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
// 바탕 채우기 메서드 버튼 클릭했을때 실행
function handleModeClick()
{   // filling이 true면 false로 변경후 Fill text저장
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    }
    // Paint모드일 때
    // filling이 false이면 true로 변경 후 Paint text저장
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}
// 캔버스 바탕 채우는 메서드 Paint모드일 때
function handleCanvasClick(){
    // filling이 true이 "Paint"인 상태에서 canvas를 클릭하면 실행,전체 배경 색깔 입히기
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
// 우클릭 방지 메서드
function handleCM(event){
    event.preventDefault();
}
// 파일 저장 메서드
function handleSaveClick(){
    // 해당 image 가져오기 
    // default값은 png로 저장
    const image = canvas.toDataURL();
    // const image = canvas.toDataURL("image/jpeg");
    // a태그를 만들어서 link에 저장
    const link = document.createElement("a");
    // href에는 URL저장
    link.href = image;
    // 저장할 파일명
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    // 마우스 움직일때
    canvas.addEventListener("mousemove", onMouseMove);
    // 마우스 클릭할때
    canvas.addEventListener("mousedown", startPainting);
    // 마우스 클릭하고 뗄 때
    canvas.addEventListener("mouseup", stopPainting);
    // 마우스가 벗어날때
    canvas.addEventListener("mouseleave", stopPainting);
    // fill버튼 클릭할때
    canvas.addEventListener("click", handleCanvasClick);
    // 우클릭 방지 액션리스너
    canvas.addEventListener("contextmenu", handleCM);
}

// Array.from(object) 
// array.from메서드는 onject로 부터 array를 만든다.
// forEach 로 color를 돌려서 
//  color.addEventListener("click", handleColorClick)를 호출하고
// color는 바꿔도됨, 변수명임 array안의 각각을 담는 변수임
Array.from(colors).forEach(color =>
     color.addEventListener("click", handleColorClick)
    );
// 브러쉬 조절
if(range){
    range.addEventListener("input", handleRangeChange);
}
// 바탕 채우기 조절
if(mode){
    mode.addEventListener("click", handleModeClick);
}
// 저장하기
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}






    