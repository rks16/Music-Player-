console.log("lets write JS");
let currentSong = new Audio();
let getys;
let currFolder;

async function getSongs() {
//   currFolder = folder;
    // let a = await fetch(`http://192.168.0.101:5500/${folder}/`);
    let a = await fetch(`http://192.168.0.101:5500/songs/`);
  let rep = await a.text();


  let div = document.createElement("div");
  div.innerHTML = rep;
  let as = div.getElementsByTagName("a");

  
  let songss = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];

    if (element.href.endsWith(".mp3")) {
        //  songss.push(element.href.split(`/${folder}/`)[1]);
         songss.push(element.href.split("/songs/")[1]);
      
    }
  }


  return songss;
}

function formatTime(seconds) {
    let roundedSeconds = Math.round(seconds);
    let minutes = Math.floor(roundedSeconds / 60);
    let remainingSeconds = roundedSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

const playMusic = (track)=>{
//    let audio = new Audio("/songs/" +  track);
    // currentSong.src = `/${currFolder}/` +  track;
      currentSong.src = "/songs/" +  track;

   currentSong.play();
   play.src ="/img/pause.svg";
   document.querySelector(".snginfo").innerHTML= decodeURI(track);
   document.querySelector(".sngtime").innerHTML= "00:00 / 00:00";

}

async function main() {
  // get the list of all the songs
     getys = await getSongs("/songs/");
//   console.log(getys);

  // to list the songs one by one
  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  for (const song of getys) {
    // songUL.innerHTML = songUL.innerHTML+ song;
    songUL.innerHTML =
      songUL.innerHTML +
      `<li> <i class="fa-solid fa-music"></i> <div> ${song.replaceAll("%20"," ")} </div> </li>`;
  }

// // //   //play audio
// // //   var audio = new Audio(getys[2]);
// // //   audio.play();

// // //   audio.addEventListener("loadeddata", () => {
// // //     console.log(audio.duration, audio.cuurentSrc, audio.currentTime);
// // //   });


//attaching event listener to song 

Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", element =>{
        playMusic(e.children[1].innerHTML.trim())
    })
})

// code for play pause, next and previous track

play.addEventListener("click", ()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src= "/img/pause.svg"
    }
    else{
        currentSong.pause()
        play.src ="/img/play.svg"
    }
})

    // event listner for time update event
    currentSong.addEventListener("timeupdate",()=>{
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".sngtime").innerHTML = `${formatTime(currentSong.currentTime)}/ ${formatTime(currentSong.duration)}`

        document.querySelector(".circle").style.left = ((currentSong.currentTime/currentSong.duration)*100) + "%";
    })

    // seekbar to seek music

    document.querySelector(".seekbar").addEventListener("click",(e)=>{

        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration)* percent)/100
    })

    // eventlistner for menu hamburger in mobile view

    document.querySelector(".ham").addEventListener("click",()=>{
        document.querySelector(".left").style.left = 0
    })

    //closing the hamburger
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-100%"
    })

    //event listners for previous and next songs
    previous.addEventListener("click",()=>{
        currentSong.pause()
        
        console.log("Previous clicked");

        let index = getys.indexOf(currentSong.src.split("/").slice(-1) [0])
        if((index-1) >= 0){
            playMusic(getys[index-1])
        }
    })


    //event listners for next song
    next.addEventListener("click",()=>{
        currentSong.pause()
        console.log("next clicked")
        
        let index = getys.indexOf(currentSong.src.split("/").slice(-1) [0])
        // console.log(index);

        if((index+1) < getys.length){
            playMusic(getys[index+1])
         }
    })

}

main();
