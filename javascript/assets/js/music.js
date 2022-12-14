const allMusic = [
    {
        name : "1. A Year Ago",
        artist : "NETFFEX",
        img : "music_view01",
        audio : "music_audio01"
    },
    {
        name : "2. As You Fade Away",
        artist : "NETFFEX",
        img : "music_view02",
        audio : "music_audio02"
    },
    {
        name : "3. Believe",
        artist : "NETFFEX",
        img : "music_view03",
        audio : "music_audio03"
    },
    {
        name : "4. Go!",
        artist : "NETFFEX",
        img : "music_view04",
        audio : "music_audio04"
    },
    {
        name : "5. Good day (Wake up)",
        artist : "NETFFEX",
        img : "music_view05",
        audio : "music_audio05"
    },
    {
        name : "6. Play Dead",
        artist : "NETFFEX",
        img : "music_view06",
        audio : "music_audio06"
    },
    {
        name : "7. Ruthless",
        artist : "NETFFEX",
        img : "music_view07",
        audio : "music_audio07"
    },
    {
        name : "8. Something You Could Never Own",
        artist : "NETFFEX",
        img : "music_view08",
        audio : "music_audio08"
    },
    {
        name : "9. Take Me Back",
        artist : "NETFFEX",
        img : "music_view09",
        audio : "music_audio09"
    },
    {
        name : "10. Til I Hear'em Say (Inst)",
        artist : "NETFFEX",
        img : "music_view10",
        audio : "music_audio10"
    }
]

const musicWrap = document.querySelector(".music__wrap");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3");
const musicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");
const musicRepeat = musicWrap.querySelector("#control-repeat");
const musicPlay = musicWrap.querySelector("#control-play");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicListBtn = musicWrap.querySelector("#control-list");
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuration = musicWrap.querySelector(".progress .timer .duration");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");
const musicListClose = musicWrap.querySelector(".music__list h3 .close");

let musicIndex = 1;     // ?????? ?????? ?????????

// ?????? ??????
function loadMusic(num){
    musicName.innerText = allMusic[num-1].name;                         // ?????? ?????? ??????
    musicArtist.innerText = allMusic[num-1].artist;                     // ?????? ???????????? ??????
    musicView.src = `../assets/img/${allMusic[num-1].img}.png`;         // ?????? ????????? ??????
    musicView.alt = allMusic[num-1].name;                               // ?????? ????????? alt ?????? ??????
    musicAudio.src = `../assets/audio/${allMusic[num-1].audio}.mp3`;    // ?????? ??????
}

// ????????????
function playMusic(){
    musicWrap.classList.add("paused");
    musicPlay.setAttribute("title","??????");
    musicPlay.setAttribute("class","stop");
    musicAudio.play();
}

// ????????????
function pauseMusic(){
    musicWrap.classList.remove("paused");
    musicPlay.setAttribute("title","??????");
    musicPlay.setAttribute("class","play");
    musicAudio.pause();
}

// ?????? ??? ?????? ??????
function prevMusic(){
    // musicIndex --
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;      // ????????? ?????? ????????? ????????? ?????????, ????????? ????????? ??? 1??? ???????????????
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}

// ?????? ??? ?????? ??????
function nextMusic(){
    // musicIndex ++
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;      // ????????? ?????? ?????? ????????? ?????????, ????????? ????????? ??? 1??? ???????????????
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}

// ?????? ?????? ???
musicAudio.addEventListener("timeupdate", e => {
    // console.log(e);

    const currentTime = e.target.currentTime;           //?????? ?????? ??????
    const duration = e.target.duration;                 // ???????????? ??? ??????
    
    let progressWidth = (currentTime/duration) * 100;   // ?????? ???????????? ?????? ???????????? ????????? ???????????? ?????????
    musicProgressBar.style.width = `${progressWidth}%`;

    // ????????????
    musicAudio.addEventListener("loadeddata", () => {
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);  // ???????????? ???(?????????)
        let totalSec = Math.floor(audioDuration % 60);  // ???????????? ????????? ???(?????????)

        if(totalSec < 10) totalSec = `0${totalSec}`;    // ?????? ??? ???????????? ??? ?????? 0??? ??????
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`;    // ????????? ?????? ??????
    });

    // ????????????
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    if(currentSec < 10) currentSec = `0${currentSec}`;
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;

});

// ????????? ??????
musicProgress.addEventListener("click", (e) => {
    let progressWidth = musicProgress.clientWidth;  // ????????? ?????? ??????
    let clickedOffsetX = e.offsetX;                 // ????????? ???????????? ???????????? X????????? (offsetX : ????????????)
    let songDuration = musicAudio.duration;         // ????????? ?????? ??????

    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;   // ???????????? ?????? ????????? ?????? ?????? ????????? ????????? ?????? ??????????????? ??????

});

//?????? ?????? ??????
musicRepeat.addEventListener("click", () => {
    let getAttr = musicRepeat.getAttribute("class");
    
    switch(getAttr){
        case "repeat" :
            musicRepeat.setAttribute("class", "repeat_one");
            musicRepeat.setAttribute("title", "?????? ??????");
        break;

        case "repeat_one" :
            musicRepeat.setAttribute("class", "shuffle");
            musicRepeat.setAttribute("title", "?????? ??????");
        break;

        case "shuffle" :
            musicRepeat.setAttribute("class", "repeat");
            musicRepeat.setAttribute("title", "?????? ??????");
        break;
    }
});

// ???????????? ?????????
musicAudio.addEventListener("ended", () => {
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" :
            nextMusic();
        break;
        case "repeat_one" :
            playMusic();
        break;
        case "shuffle" :
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1);  // ?????? ????????? ??????
            // while??? ????????? ????????? ??????, do while ????????? ???????????? ???????????? ??????
            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randomIndex)
            musicIndex = randomIndex;   // ?????? ???????????? ?????? ???????????? ??????
            loadMusic(musicIndex);      // ?????? ???????????? ????????? ?????? ????????? ????????? ????????? ?????? ??????
            playMusic();                // ????????? ????????? ??????
        break;
    }
    playListMusic();    // ???????????? ????????? ???????????? ????????????
});

// ????????? ??????
musicPlay.addEventListener("click", () => {
    const isMusicPaused = musicWrap.classList.contains("paused");   //  paused??? ????????? ????????? ?????????
    isMusicPaused ? pauseMusic() : playMusic();
});

// ????????? ?????? ??????
musicPrevBtn.addEventListener("click", () => {
    prevMusic();
});

// ????????? ?????? ??????
musicNextBtn.addEventListener("click", () => {
    nextMusic();
});

// ?????? ????????? ??????
musicListBtn.addEventListener("click", () => {
    musicList.classList.add("show");
});

// ?????? ????????? ?????? ??????
musicListClose.addEventListener("click", () => {
    musicList.classList.remove("show");
})

// ?????? ????????? ????????????
for(let i=0; i<allMusic.length; i++){
    let li = `
        <li data-index="${i+1}">
            <strong>${allMusic[i].name}</strong>
            <em>${allMusic[i].artist}</em>
            <audio class="${allMusic[i].audio}" src="../assets/audio/${allMusic[i].audio}.mp3"></audio>
            <span class="audio-duration" id="${allMusic[i].audio}">????????????</span>
        </li>
    `;

    // musicListUl.innerHTML += li;
    musicListUl.insertAdjacentHTML("beforeend", li);

    // ???????????? ?????? ?????? ????????????
    let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`); //??????????????? ????????? ????????? ???????????? ????????? ?????? ???
    let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);        //??????????????? ???????????? ?????????
    // ????????? ?????? ???
    liAudio.addEventListener("loadeddata",() => {
        let audioDuration = liAudio.duration;                                       //????????? ?????? ??????
        let totalMin = Math.floor(audioDuration / 60);                              //????????? ?????? ????????? ??? ????????? ??????
        let totalSec = Math.floor(audioDuration % 60);                              //??? ??????
        if(totalSec < 10) totalSec = `0${totalSec}`;                                //??? ????????? 0 ??????
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;                      //????????? ??????
        liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`);   //????????? ????????? ?????? ??????
    });

}

// ?????? ????????? ???????????? ??????
function playListMusic(){
    const musicListAll = musicListUl.querySelectorAll("li");    // ?????? ????????? ??????
    for(let i=0; i<musicListAll.length; i++){
        let audioTag = musicListAll[i].querySelector(".audio-duration");

        if(musicListAll[i].classList.contains("playing")){
            musicListAll[i].classList.remove(["playing"]);              // ???????????? ???????????? ??????
            let adDuration = audioTag.getAttribute("data-duration");    // ????????? ???????????? ????????????
            audioTag.innerText = adDuration;                            // ????????? ???????????? ??????
        }

        if(musicListAll[i].getAttribute("data-index") == musicIndex){   // ?????? ?????? ???????????? ????????? ????????? ?????? ?????? ??????
            musicListAll[i].classList.add("playing");                   // class??? playing ??????
            audioTag.innerText = "?????????";                                //???????????? ????????? ?????? ??????
        }

        musicListAll[i].setAttribute("onclick", "clicked(this)");
    }
}

// ?????? ????????? ????????????
function clicked(el){
    let getLiIndex = el. getAttribute("data-index");    // ????????? ???????????? ????????? ?????? ??????
    musicIndex = getLiIndex;                            // ????????? ????????? ?????? ?????? ???????????? ??????
    loadMusic(musicIndex);                              // ?????? ????????? ?????? ??????
    playMusic();                                        // ?????? ??????
    playListMusic();                                    // ?????? ????????? ????????????
}

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);      //?????? ??????
    playListMusic();            //????????? ?????????
});

document.querySelector(".i1").addEventListener("click", () => {
    musicAudio.pause();
})