// 01 HTML/CSS 디자인 구성
// 02 클릭한 카드 뒤집기
// 03 두개의 카드 뒤집은 결과 확인하기

const memoryWrap = document.querySelector(".memory__wrap");
const memoryDesc = memoryWrap.querySelector(".memory__info .desc");
const times = memoryWrap.querySelector(".memory__info .times");
const puzzle = memoryWrap.querySelectorAll(".memory__info .times .pz");
const memoryStart = memoryWrap.querySelector(".memory__info .start");
const memoryAgain = memoryWrap.querySelector(".memory__info .restart");
const memoryCard = memoryWrap.querySelectorAll(".memory__card");
const memoryCards = memoryWrap.querySelectorAll(".cards li");
const memoryClose = memoryWrap.querySelector(".memory__close");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let error = 0;

let sound = [
  "../assets/audio/match.m4a",
  "../assets/audio/unmatch.m4a",
  "../assets/audio/success.m4a",
];
let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);

// 카드 뒤집기
function flipCard(e) {
  let clickedCard = e.target;

  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector(".back img").src;
    let cardTwoImg = cardTwo.querySelector(".back img").src;

    matchCards(cardOneImg, cardTwoImg);
  }
}

// 뒤집은 카드끼리 확인
function matchCards(img1, img2) {
  if (img1 == img2) {
    // 같을 경우
    matchedCard++;

    if (matchedCard == 8) {
      alert("이걸 성공하시다니🙄");
      soundSuccess.play();
      memoryAgain.classList.add("show");
      memoryCard.style.pointerEvents = "none";
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;

    soundMatch.play();
  } else {
    // 일치하지 않는 경우 이미지 좌우로 흔들리게
    setTimeout(() => {
      cardOne.classList.add("shakeX");
      cardTwo.classList.add("shakeX");
    }, 500);

    setTimeout(() => {
      cardOne.classList.remove("shakeX", "flip");
      cardTwo.classList.remove("shakeX", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1600);

    if (error == 9) {
      alert("아쉽게도 10번의 기회를 다 쓰셨네요 :( 다시 시도해주세요!");
      memoryAgain.classList.add("show");
    }

    puzzle[error].classList.add("hide");

    error++;

    soundUnMatch.play();
  }
}

// 카드 섞기
function shuffleCard() {
  cardOne = cardTwo = "";
  disableDeck = false;
  matchedCard = 0;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  let result = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  memoryCards.forEach((card, index) => {
    card.classList.remove("flip");

    setTimeout(() => {
      card.classList.add("flip");
    }, 200 * index);

    setTimeout(() => {
      card.classList.remove("flip");
    }, 5000);

    setTimeout(() => {
      memoryCard.style.pointerEvents = "none";
    }, 200 * index + 5000);

    // 클릭 카드 뒤집기
    memoryCards.forEach((card) => {
      card.addEventListener("click", flipCard);
    });

    let imgTag = card.querySelector(".back img");
    imgTag.src = `../assets/img/memory_card_${arr[index]}.png`;
  });
}

//다시 시작하기
function restart() {
  cardOne = cardTwo = "";
  disableDeck = false;
  matchedCard = 0;
  error = 0;
  shuffleCard();
  memoryAgain.classList.remove("show");
  document.querySelector(".memory__info .times .p1").classList.remove("hide");
  document.querySelector(".memory__info .times .p2").classList.remove("hide");
  document.querySelector(".memory__info .times .p3").classList.remove("hide");
  document.querySelector(".memory__info .times .p4").classList.remove("hide");
  document.querySelector(".memory__info .times .p5").classList.remove("hide");
  document.querySelector(".memory__info .times .p6").classList.remove("hide");
  document.querySelector(".memory__info .times .p7").classList.remove("hide");
  document.querySelector(".memory__info .times .p8").classList.remove("hide");
  document.querySelector(".memory__info .times .p9").classList.remove("hide");
  document.querySelector(".memory__info .times .p10").classList.remove("hide");
}

// 게임 나갔다가 다시 들어갔을때 초기화
function memoryReset() {
  cardOne = cardTwo = "";
  disableDeck = false;
  matchedCard = 0;
  error = 0;
  memoryDesc.classList.add("show");
  memoryStart.style.display = "block";
  times.classList.remove("show");
}

// // 카드를 클릭했을 때
// memoryCards.forEach((card) => {
//   card.addEventListener("click", flipCard);
// });

//버튼 이벤트
memoryStart.addEventListener("click", () => {
  memoryStart.style.display = "none";
  memoryDesc.classList.remove("show");
  times.classList.add("show");
  soundMatch.play();
  shuffleCard();
  document.querySelector(".memory__info .times .p1").classList.remove("hide");
  document.querySelector(".memory__info .times .p2").classList.remove("hide");
  document.querySelector(".memory__info .times .p3").classList.remove("hide");
  document.querySelector(".memory__info .times .p4").classList.remove("hide");
  document.querySelector(".memory__info .times .p5").classList.remove("hide");
  document.querySelector(".memory__info .times .p6").classList.remove("hide");
  document.querySelector(".memory__info .times .p7").classList.remove("hide");
  document.querySelector(".memory__info .times .p8").classList.remove("hide");
  document.querySelector(".memory__info .times .p9").classList.remove("hide");
  document.querySelector(".memory__info .times .p10").classList.remove("hide");
});
memoryAgain.addEventListener("click", () => {
  restart();

  // puzzle.children.classList.remove("hide");
});
memoryClose.addEventListener("click", () => {
  memoryReset();
});
document.querySelector(".i3").addEventListener("click", memoryReset);
