const tetrisWrap = document.querySelector(".tetris__wrap");
const playground = tetrisWrap.querySelector(".playground > ul");
const tetrisMusic = tetrisWrap.querySelector(".tetris__audio #audio");
const popUp = tetrisWrap.querySelector(".tetris__play .popup");
const result = tetrisWrap.querySelector(".tetris__play .result");
const tetScore = tetrisWrap.querySelector(".tetris__play .score");
const startBtn = tetrisWrap.querySelector(".reset .start");
const restartBtn = tetrisWrap.querySelector(".reset .tetRestart");

// variables(변수 설정)
let rows = 15;
let cols = 14;
let tetscore = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
let stopTetris = false;

// 블록 정보
const movingItem = {
  type: "Tmino",
  direction: 0, // 블록 모양
  top: 0,
  left: 5,
};

// 블록 좌표값
const blocks = {
  Tmino: [
    [
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ], // Tmino 기본 모양
    [
      [1, 2],
      [0, 1],
      [1, 0],
      [1, 1],
    ], // Tmino 기본 모양2
    [
      [1, 2],
      [0, 1],
      [2, 1],
      [1, 1],
    ], // Tmino 기본 모양3
    [
      [2, 1],
      [1, 2],
      [1, 0],
      [1, 1],
    ], // Tmino 기본 모양4
  ],
  Imino: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  ],
  Omino: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  Zmino: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
  ],
  Smino: [
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  Jmino: [
    [
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
  ],
  Lmino: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 0],
      [2, 1],
    ],
  ],
};

//퀴즈 스타트
function startTetris() {
  //팝업창 없애기
  popUp.classList.remove("show");
  result.classList.remove("show");

  tempMovingItem = { ...movingItem };

  generateNewBlock(); // 블록 만들기

  tetrisMusic.play();

  tetScore.innerHTML = "";
}

// 첫 화면
function init() {
  popUp.classList.add("show");

  for (let i = 0; i < rows; i++) {
    prependNewLine(); // 블록 라인 만들기
  }
}

// 블록 만들기
function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");

  for (let j = 0; j < cols; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }

  li.prepend(ul);

  playground.prepend(li);
}

// 블록 출력하기
function renderBlocks(moveType = "") {
  // const ty = tempMovingItem.type;
  // const di = tempMovingItem.direction;
  // const to = tempMovingItem.top;
  // const le = tempMovingItem.left;

  const { type, direction, top, left } = tempMovingItem;

  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, "moving");
  });

  blocks[type][direction].some((block) => {
    const x = block[0] + left; // 2 0 1 1
    const y = block[1] + top; // 1 1 0 1

    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null; //playground의 첫번째 자식 ul > li > x좌표 넣어주기, 범위 넘어갔을때 null 값 출력
    const isAvailable = checkEmpty(target);

    if (isAvailable) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem }; // 값이 없을 때 그 전 값으로 초기화

      if (moveType === "retry") {
        clearInterval(downInterval);
        // duration = 0;
        tetrisGameover();
      }
      setTimeout(() => {
        renderBlocks("retry");
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);
      return true;
    }

    // console.log({playground})
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
}

// 블록 감지하기
function seizeBlock() {
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove("moving");
    moving.classList.add("seized");
  });
  checkMatch();
}

// 한줄 완성 제거하기
function checkMatch() {
  const childNodes = playground.childNodes;

  childNodes.forEach((child) => {
    let matched = true;
    child.children[0].childNodes.forEach((li) => {
      if (!li.classList.contains("seized")) {
        matched = false;
      }
    });
    if (matched) {
      child.remove();
      prependNewLine();
      tetscore++;
      tetScore.innerHTML = tetscore;
      duration -= 30;
    }
  });
  generateNewBlock();
}

// 새로운 블록 만들기
function generateNewBlock() {
  clearInterval(downInterval);

  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, duration);

  const blockArray = Object.entries(blocks);
  const randomIndex = Math.floor(Math.random() * blockArray.length);
  movingItem.type = blockArray[randomIndex][0];
  movingItem.top = 0;
  movingItem.left = 5;
  movingItem.direction = 0;
  tempMovingItem = { ...movingItem };
  renderBlocks();
}

// 빈칸 확인하기
function checkEmpty(target) {
  if (!target || target.classList.contains("seized")) {
    return false;
  }
  return true;
}

// 블록 움직이기
function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

// 모양 바꾸기
function changeDirection() {
  const direction = tempMovingItem.direction;
  direction === 3
    ? (tempMovingItem.direction = 0)
    : (tempMovingItem.direction += 1);
  renderBlocks();
}

// 블록 빨리 내리기
function dropBlock() {
  clearInterval(downInterval);

  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, 10);
}

// 게임 오버
function tetrisGameover() {
  tetrisMusic.pause();
  tetrisMusic.currentTime = 0;
  // duration = 500;
  result.classList.add("show");
}

// 리셋하기
function resetTetris() {
  tetscore = 0;
  tetrisLine = 0;
  stopTetris = false;
  duration = 500;
  tetScore.innerText = tetscore;
  // playground.childNodes.remove();
}

// 버튼 클릭
startBtn.addEventListener("click", startTetris);
restartBtn.addEventListener("click", () => {
  result.classList.remove("show");
  popUp.classList.add("show");
  resetTetris();
});

// 이벤트
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 39:
      moveBlock("left", 1);
      break;
    case 37:
      moveBlock("left", -1);
      break;
    case 40:
      moveBlock("top", 1);
      break;
    case 38:
      changeDirection();
      break;
    case 32:
      dropBlock();
      break;
    default:
      break;
  }
});

init();
