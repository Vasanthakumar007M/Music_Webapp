let now_play = document.querySelector('.now-play');
let song_img = document.querySelector('.song-img');
let song_name = document.querySelector('.song-name');
let song_singer = document.querySelector('.song-singer');

let curr_song = document.createElement('audio');
let prev_btn = document.querySelector('.prev-song');
let playpause_btn = document.querySelector('.playpause-song');
let next_btn = document.querySelector('.next-song');

let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let seek_slider = document.querySelector('.seek_slider');
let total_duration = document.querySelector('.total-duration');

let song_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img    : 'img/leo.jpg',
        name   : 'NAA READY THAN',
        singer : 'Vijay, Asal kolar',
        music  : 'mp3/Naa-Ready-leo.mp3'
    },
    {
        img    : 'img/hukum.jpeg',
        name   : 'Tiger Ka Hukum',
        singer : 'Aniruth, Rajini',
        music  : 'mp3/Hukum-jailer.mp3'
    },
    {
        img    : 'img/kavalaya.jpeg',
        name   : 'Kaavaala',
        singer : 'Shilpa Rao',
        music  : 'mp3/Kaavaalaa-jailer.mp3'
    }, 
    {   img    : 'img/Rolex.jpeg',
        name   : 'Rolex BGM',
        singer : 'instrumental',
        music  : 'mp3/Vikram Dilli ! Vikram ! Theme.mp3'
    },
    {
        img    : 'img/vikram.jpeg',
        name   : 'Vikram title track',
        singer : 'Aniruth, Kamal',
        music  : 'mp3/VIKRAM Title Track.mp3'
    }
];

loadSong(song_index);

function loadSong(song_index){
    clearInterval(updateTimer);
    reset();

    curr_song.src = music_list[song_index].music;
    curr_song.load();

    song_img.style.backgroundImage = "url(" + music_list[song_index].img + ")";
    song_name.textContent = music_list[song_index].name;
    song_singer.textContent = music_list[song_index].singer;
    now_play.textContent = "Now Play " + (song_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_song.addEventListener('ended', nextSong);
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function repeatSong(){
    let current_index = song_index;
    loadSong(current_index);
    playSong
}
function playpauseSong(){
    isPlaying ? pauseSong() : playSong();
}
function playSong(){
    curr_song.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseSong(){
    curr_song.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextSong(){
    if(song_index < music_list.length - 1 && isRandom === false){
        song_index += 1;
    }
    else{
        song_index = 0;
    }
    loadSong(song_index);
    playSong();
}
function prevSong(){
    if(song_index > 0){
        song_index -= 1;
    }else{
        song_index = music_list.length -1;
    }
    loadSong(song_index);
    playSong();
}
function seekTo(){
    let seekto = curr_song.duration * (seek_slider.value / 100);
    curr_song.currentTime = seekto;
}
function setVolume(){
    curr_song.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_song.duration)){
        seekPosition = curr_song.currentTime * (100 / curr_song.duration);
        seek_slider.value = seekPosition;

        let currentMinutes  = Math.floor(curr_song.currentTime / 60);
        let currentSeconds  = Math.floor(curr_song.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_song.duration / 60);
        let durationSeconds = Math.floor(curr_song.duration - durationMinutes * 60);

        if(currentSeconds  < 10) {currentSeconds = "0" + currentSeconds;  }
        if(durationSeconds < 10){durationSeconds= "0" + durationSeconds;}
        if(currentMinutes  < 10) {currentMinutes = "0" + currentMinutes;  }
        if(durationMinutes < 10){durationMinutes= "0" + durationMinutes;}

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}