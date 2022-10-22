let allMusic = [
  {
    name: "first song",
    artist: "first singer",
    img: "./assets/files/img/img.jpg",
    src: "./assets/files/src/music.mp3"
  },
	{
    name: "second song",
    artist: "second singer",
    img: './assets/files/img/img.jpg',
    src: "./assets/files/src/music1.mp3",
  },
	{
    name: "third song",
    artist: "third singer",
    img: "./assets/files/img/img2.jpg",
    src: "./assets/files/src/music2.mp3",
  },
	{
    name: "fourth song",
    artist: "fourth singer",
    img: "./assets/files/img/img3.jpg",
    src: "./assets/files/src/music3.mp3",
  },
	{
    name: "fifth song",
    artist: "fifth singer",
    img: "./assets/files/img/img4.jpg",
    src: "./assets/files/src/music4.mp3",
  },
	{
    name: "sixth song",
    artist: "sixth singer",
    img: "./assets/files/img/img5.jpg",
    src: "./assets/files/src/music5.mp3",
  },
	{
    name: "seventh song",
    artist: "seventh singer",
    img: "./assets/files/img/img6.jpg",
    src: "./assets/files/src/music6.mp3",
  },
];

const wrapper = document.querySelector('.wrapper');
const musicImg = wrapper.querySelector('.img-area img');
const musicName = wrapper.querySelector('.song-details .name');
const musicArtist = wrapper.querySelector('.song-details .artist');
const mainAudio = wrapper.querySelector('#audio');
const nextBtn = wrapper.querySelector('#next');
const prevBtn = wrapper.querySelector('#prev');
const playPauseBtn = wrapper.querySelector('.play-pause');
const progressBar = wrapper.querySelector('.progress-bar');
const progressArea = wrapper.querySelector('.progress-area');
const showMoreBtn = wrapper.querySelector('#more-music');
const musicList = wrapper.querySelector('.music-list');
const hideMusicBtn = musicList.querySelector('#close');

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);//random song when render

window.addEventListener('load', () => {
	loadMusic(musicIndex); //calling load music once window
  nowPlayMusic();
});
//load music function
function loadMusic (indexNumb) {
	musicName.innerHTML = allMusic[indexNumb - 1].name;
	musicArtist.innerHTML = allMusic[indexNumb - 1].artist;
	musicImg.src = allMusic[indexNumb - 1].img;
	mainAudio.src = allMusic[indexNumb - 1].src;
}

// play music
function playMusic () {
  wrapper.classList.add('paused');
  playPauseBtn.querySelector('i').classList.remove('fa-solid', 'fa-circle-play');
  playPauseBtn.querySelector('i').classList.add('fa-solid', 'fa-circle-pause');
  mainAudio.play();
}
// pause music
function pauseMusic () {
  wrapper.classList.remove('paused');
  playPauseBtn.querySelector('i').classList.remove('fa-solid', 'fa-circle-pause');
  playPauseBtn.querySelector('i').classList.add('fa-solid', 'fa-circle-play');
  mainAudio.pause();
}

// next music
function nextMusic () {
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex;
  loadMusic(musicIndex);
  playMusic();
  nowPlayMusic();
}
// prev music
function prevMusic () {
  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex;
  loadMusic(musicIndex);
  playMusic();
  nowPlayMusic();
}

playPauseBtn.addEventListener('click' , ()=> {
  const isMusicPause = wrapper.classList.contains("paused");
  //if isMusicPause is true then call pauseMusic else call playMusic
  isMusicPause ? pauseMusic() : playMusic();
});

nextBtn.addEventListener('click', ()=>{
  if (repeatBtn.classList.contains('fa-shuffle')) {
    let randomIndex;
    do {
      randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
    }while (musicIndex == randomIndex);
    musicIndex = randomIndex;
    playMusic();
    nowPlayMusic();
  }
  nextMusic();//calling enter button next music
})
prevBtn.addEventListener('click', ()=> {
  if (repeatBtn.classList.contains('fa-shuffle')) {
    let randomIndex;
    do {
      randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
    }while (musicIndex == randomIndex);
    musicIndex = randomIndex;
    playMusic();
    nowPlayMusic();
  }
  prevMusic();//calling enter button prev music
})

// update progress with according to music current time
mainAudio.addEventListener('timeupdate', (e)=> {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;//geting current time of song
  progressBar.style.width = `${progressWidth}%`;// assign for progressbar
  
  let musicCurrentTime = wrapper.querySelector('.current');
  let musicDurationTime = wrapper.querySelector('.duration');

  mainAudio.addEventListener('loadeddata', ()=> {

    // update song total duration
    let audioDuration = mainAudio.duration;
    let totalMinute = Math.floor(audioDuration / 60);//geting minute
    let totalSecond = Math.floor(audioDuration % 60);//geting second
    if (totalMinute < 10) {
      totalMinute = `0${totalMinute}`;
    }
    if (totalSecond < 10) {
      totalSecond = `0${totalSecond}`;
    }
    musicDurationTime.innerText = `${totalMinute}:${totalSecond}`;//showing minute and second into screen 
  });
    // update song current time
    let currentMinute = Math.floor(currentTime / 60);//geting minute
    let currentSecond = Math.floor(currentTime % 60);//geting second
    if (currentMinute < 10) {
      currentMinute = `0${currentMinute}`;
    }
    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`;
    }
    musicCurrentTime.innerText = `${currentMinute}:${currentSecond}`;//showing minute and second into screen 
});

// get's update playing song current time according to the progress bar
progressArea.addEventListener('click', (e)=> {
  let progressWidthval = progressArea.clientWidth;//getting width of progress bar
  let clickedOffsetX = e.offsetX;//getting offset x current value
  let songDuration = mainAudio.duration;//getting song total duration
  mainAudio.currentTime = (clickedOffsetX / progressWidthval) * songDuration;
  playMusic();
})

// let's change icons on repeat or shuffle song 
const repeatBtn = wrapper.querySelector('#repeat');
repeatBtn.addEventListener("click", ()=>{
  let getRepeat = repeatBtn.classList.contains('repeat');
  if (getRepeat) {
    repeatBtn.classList.remove("fa-solid", "fa-repeat");
    repeatBtn.classList.add("fa-solid", "fa-shuffle");
    getRepeat = repeatBtn.classList.remove('repeat');
    repeatBtn.title = 'PlayList shuffle';
  } else {
    repeatBtn.classList.remove("fa-solid", "fa-shuffle");
    repeatBtn.classList.add("fa-solid", "fa-repeat");
    getRepeat = repeatBtn.classList.add('repeat');
    repeatBtn.title = 'Playlist looped';
  }
})

// let's work with repeat or shuffle song
mainAudio.addEventListener('ended',()=>{
  let getRepeat = repeatBtn.classList.contains('repeat');
  if (getRepeat) {
    nextMusic();
  } else {
      let randomIndex;
      do {
        randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while (musicIndex === randomIndex);
      musicIndex = randomIndex;
      loadMusic(musicIndex);
      playMusic();
      nowPlayMusic();
    }
});

showMoreBtn.addEventListener('click', ()=>{
  musicList.classList.toggle('show');
});
hideMusicBtn.addEventListener('click', ()=>{
  showMoreBtn.click();
});

const ulTag = wrapper.querySelector('ul');

// C1:
let arrayIndex = {};//saving index
// render on UI
const liTag = allMusic.map((song, index) => {
  // getting index
  if (Array.isArray(arrayIndex)) {
    arrayIndex.push(index);
  }else {
    arrayIndex = [index];
  }
  return `<li li-index=${index + 1}>
            <div class="row">
              <span>${song.name}</span>
              <p>${song.artist}</p>
            </div>
            <audio class="song-${index}" src="${song.src}"></audio>
            <span id="duration-${index}" class="audio-duration">02:32</span>
          </li> `
});
ulTag.innerHTML = liTag.join('');
for (var value of arrayIndex) {
  let liAudioTag = ulTag.querySelector(`.song-${value}`);
  let liDurationTag = ulTag.querySelector(`#duration-${value}`);

  // getting duration of song
  liAudioTag.onloadeddata = function () {
    let audioDuration = liAudioTag.duration;
    let totalMinute = Math.floor(audioDuration / 60);//getting minute
    let totalSecond = Math.floor(audioDuration % 60);//getting second
    if (totalMinute < 10) {
      totalMinute.innerHTML = `0${totalMinute}`;
    }
    if (totalSecond < 10) {
      totalSecond.innerHTML = `0${totalSecond}`;
    }
    // render audition song on UI
    liDurationTag.innerHTML = `${totalMinute}:${totalSecond}`;
    // let's value of liDuration
    liDurationTag.setAttribute('t-duration', `${totalMinute}:${totalSecond}`);
  }
}

// C2:
// for (let i = 0; i < allMusic.length; i++) {
//   let liTag = `<li>
//                 <div class="row">
//                   <span>${allMusic[i].name}</span>
//                   <p>${allMusic[i].artist}</p>
//                 </div>
//                 <audio class="music-${i}" src="${allMusic[i].src}"></audio>
//                 <span id="duration-${i}" class="audio-duration">02:32</span>
//               </li>`;
//   ulTag.insertAdjacentHTML('beforeend', liTag);
//   let liAudioTag = ulTag.querySelector(`.music-${i}`);
//   let liAudioTagDuration = ulTag.querySelector(`#duration-${i}`);

//   liAudioTag.addEventListener('loadeddata',()=>{
//     let audioDuration = liAudioTag.duration;
//     let totalMinute = Math.floor(audioDuration / 60);//geting minute
//     let totalSecond = Math.floor(audioDuration % 60);//geting second
//     if (totalMinute < 10) {
//       totalMinute = `0${totalMinute}`;
//     }
//     if (totalSecond < 10) {
//       totalSecond = `0${totalSecond}`;
//     }
//     liAudioTagDuration.innerText = `${totalMinute}:${totalSecond}`;//showing minute and second into screen 
//   })
// }

// let's on play song when on click
const allLiTags = ulTag.querySelectorAll('li');
// function playlist songs playing now
function nowPlayMusic() {
  for(let allLiTag of allLiTags) {
    let audioTag = allLiTag.querySelector('.audio-duration');
    if(allLiTag.classList.contains('playing')) {
      allLiTag.classList.remove('playing');
      // add duration in playlist
      let adDuration = audioTag.getAttribute('t-duration');//geting duration of song
      audioTag.innerHTML = adDuration;//set duration for song playlist
    }
    // set color and playing for song playlist
    if(allLiTag.getAttribute('li-index') == musicIndex) {
      allLiTag.classList.add('playing');
      audioTag.innerHTML = 'playing';
    }
    else {
      // occur when user click song of playlist
      allLiTag.onclick = function clickMusic() {
        let getLiIndex = allLiTag.getAttribute('li-index');
        musicIndex = getLiIndex;
        loadMusic(musicIndex);
        playMusic();
        nowPlayMusic();
      }
    }
  }
}
// let's play song when click on 'li'
// function clickMusic(e) {
//   let getLiIndex = e.target.getAttribute('li-index');
//   musicIndex = getLiIndex;
//   loadMusic(musicIndex);
//   playMusic();
//   nowPlayMusic();
// }//***error when click on name or artist