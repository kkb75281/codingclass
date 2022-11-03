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

    // for (let i = 1; i < 11; i++) {
    //   $('.times').children(`.p[i]`).classList.add("hide");

    //   if (i == 10) {
    //     memoryReset();
    //   }
    // }

    // $('.times').click(function() {
    //   for(let i=1; i<11; i++){
    //     $(this).find('p[i]').addClass('hide');
    //   }
    //  });

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
      memoryCard.style.pointerEvents = "auto";
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
  // searchResult.classList.remove("show");
  cardOne = cardTwo = "";
  disableDeck = false;
  matchedCard = 0;
  memoryCards.forEach((card) => {
    card.classList.remove("flip");
  });
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
});
memoryAgain.addEventListener("click", restart);
memoryClose.addEventListener("click", () => {
  memoryReset();
});
