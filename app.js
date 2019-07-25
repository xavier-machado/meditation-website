if(location.href.includes('index.html')){
    // INDEX.HTML JS
    // Modal
    const typesModal = document.querySelector('.types-modal')
    const benefitsModal = document.querySelector('.benefits-modal')

    // Open types modal
    document.getElementById('types-button').addEventListener('click', () => typesModal.style.display = 'flex')

    // Open benefits modal
    document.getElementById('benefits-button').addEventListener('click', () => benefitsModal.style.display = 'flex')

    // Close modals
    document.getElementById('close-types').addEventListener('click', () => typesModal.style.display = 'none')
    document.getElementById('close-benefits').addEventListener('click', () => benefitsModal.style.display = 'none')


}else{


    // MEDITATION.HTML JS

    const app = () => {
        const song = document.querySelector('.song'); // <audio> tag
        song.loop = true;
        const play = document.querySelector('.play'); //play button
        const outline = document.querySelector('.moving-outline circle'); // blue svg, circle tag within
        const end = document.getElementById('end'); // audio to end sound

        // Sounds
        const soundPicker = document.querySelector('.sound-picker'); // get the div of the sound buttons do display none when playing
        const sounds = document.querySelectorAll('.sound-picker button'); // buttons within the sound picker div
        // Time Display
        const timeSelect = document.querySelector('.time-select'); // get the div of the timer buttons do display none when playing
        const timeDisplay = document.querySelector('.time-display'); // time display <h3>
        const timeSelectBtn = document.querySelectorAll('.time-select button'); // buttons within time select

        // Stop button
        const stop = document.querySelector('.stop')
        // Get the length of the outline
        const outlineLength = outline.getTotalLength(); // a float indicating the total length of the path in user units.
        // Duration
        let duration = 0;
        // Modal pick time variables
        const timePickedModal = document.querySelector('.modal-pick-time')
        const sendTimePicked = document.getElementById('send-time')
        var customized = 0;
        // Modal time alert
        const timeAlert = document.querySelector('.no-time');

        outline.style.strokeDasharray = outlineLength; // presentation attribute defining the pattern of dashes and gaps used to paint the outline of the shape
        outline.style.strokeDashoffset = outlineLength; // presentation attribute defining an offset on the rendering of the associated dash array

        // Pick different sounds
        sounds.forEach(sound => {
            sound.addEventListener('click', function() {
                song.src = this.getAttribute('data-sound');
                document.querySelector('.container').style.backgroundImage = "url("+this.getAttribute('data-video')+")"
                // checkPlaying(song)
                play.src = './svg/play.svg';
            })
        })

        // Play sound
        play.addEventListener('click', () => {
            checkPlaying(song)
        })


        // Seconds with double digit
        const beautifySeconds = (seconds) => {
            if(seconds < 10){
                return '0' + seconds
            }else{
                return seconds
            }
        }

        //Hide time picker modal when time is picke
        sendTimePicked.addEventListener('click', function(){
            timePickedModal.style.display = 'none';
            customized = document.getElementById('time').value;
        })
        
        

        // Select sound
        timeSelectBtn.forEach(option =>{
            option.addEventListener('click', function(){
                if(option.id == 'last'){
                    timePickedModal.style.display = 'flex';
                    customized = customized * 60;
                    this.setAttribute('data-time', customized)
                }
                duration = this.getAttribute('data-time');
                let seconds = Math.floor(duration % 60);
                let minutes = Math.floor(duration / 60);
                seconds = beautifySeconds(seconds)
                timeDisplay.textContent = `${minutes}:${seconds}`
            })
        });


        // Create a function specific to stop and play the sounds
        const checkPlaying = (song) => {
            if(duration == 0){
                timeAlert.style.display = 'flex';
                setTimeout(() => { timeAlert.style.display = 'none'; }, 4000)
                return;
            }
            if(song.paused){
                song.play();
                play.src = './svg/pause.svg';
                soundPicker.style.display = 'none';
                timeSelect.style.display = 'none';
                stop.style.display = 'block';
            }else{
                song.pause();
                play.src = './svg/play.svg';
            }
        };

        //We can animate the circle -- ontimeupdate basically runs when the song is running
        //while the song is going on is going to update
        song.ontimeupdate = () => {
            console.log(song.currentTime)
        }
        song.ontimeupdate = () => {
            let currentTime = song.currentTime; // will increment all the way till the song finishes
            let elapsed = duration - currentTime;
            //we're using the math.floor because the current time will be float numbers
            let seconds = Math.floor(elapsed % 60); // when it gets to 60 , jump back to 0
            let minutes = Math.floor(elapsed / 60); 
            seconds = beautifySeconds(seconds)

            // Animate the circle
            let progress = outlineLength - (currentTime / duration) * outlineLength;
            outline.style.strokeDashoffset = progress;


            // Animate the text
            timeDisplay.textContent = `${minutes}:${seconds}`

            if(currentTime > duration){
                song.pause();
                song.currentTime = 0;
                end.play();
                play.src = './svg/play.svg'
                soundPicker.style.display = 'flex';
                timeSelect.style.display = 'flex';
                stop.style.display = 'none';
            }
        }

        // Stop earlier
        stop.addEventListener('click', () => {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
            soundPicker.style.display = 'flex';
            timeSelect.style.display = 'flex';
            stop.style.display = 'none';
        })

    };

    app();

}