if (location.href.includes('index.html')) {
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


} else {


    // MEDITATION.HTML JS

    const app = () => {
        const song = document.querySelector('.song'); // <audio> tag
        song.loop = true;
        const play = document.querySelector('.play'); //play button
        const outline = document.querySelector('.moving-outline circle'); // purple svg, circle tag within
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
        // Picking time button to setAttribute
        const chooseTimeButton = document.getElementById('last');
        // Modal pick time variables
        const timePickedModal = document.querySelector('.modal-pick-time')
        const sendTimePicked = document.getElementById('send-time')
        const inputBox = document.getElementById('time');
        let customized = 0;
        // Modal time alert
        const timeAlert = document.querySelector('.no-time');
        // Seconds and minutes declration
        let seconds = 0;
        let minutes = 0;
        // Countdown
        var countdown;
        // Progress
        var progress;

        outline.style.strokeDasharray = outlineLength; // presentation attribute defining the pattern of dashes and gaps used to paint the outline of the shape
        outline.style.strokeDashoffset = outlineLength; // presentation attribute defining an offset on the rendering of the associated dash array

        // Pick different sounds
        sounds.forEach(sound => {
            sound.addEventListener('click', function () {
                song.src = this.getAttribute('data-sound');
                document.querySelector('.container').style.backgroundImage = "url(" + this.getAttribute('data-video') + ")"
            })
        })

        // Create a function specific to stop and play the sounds
        const checkPlaying = (song) => {
            if (duration == 0) {
                timeAlert.style.display = 'flex';
                setTimeout(() => { timeAlert.style.display = 'none'; }, 4000)
                return;
            }
            if (song.paused) {
                song.play();
                play.src = './svg/pause.svg';
                soundPicker.style.display = 'none';
                timeSelect.style.display = 'none';
                stop.style.display = 'block';
                countdown = setInterval(() => {
                    duration--;
                    //we're using the math.floor because the current time will be float numbers
                    let seconds = Math.floor(duration % 60); // when it gets to 60 , jump back to 0
                    let minutes = Math.floor(duration / 60);
                    seconds = beautifySeconds(seconds);
    
    
                    // Animate the circle
                    console.log(progress);
                    progress = outlineLength - (song.currentTime / duration) * outlineLength;
                    outline.style.strokeDashoffset = progress;
    
                    // Animate the text
                    timeDisplay.textContent = `${minutes}:${seconds}`
    
                    if (duration <= 0) {
                        clearInterval(countdown);
                        song.pause();
                        duration = 0;
                        progress = 0;
                        song.currentTime = 0;
                        // end.play();
                        play.src = './svg/play.svg'
                        soundPicker.style.display = 'flex';
                        timeSelect.style.display = 'flex';
                        stop.style.display = 'none';
                    }
    
                }, 1000);
            } else {
                clearInterval(countdown);
                song.pause();
                play.src = './svg/play.svg';
            }
        };

        // Play sound
        play.addEventListener('click', () => {
            checkPlaying(song)
        })


        // Display seconds with double digits
        const beautifySeconds = (seconds) => {
            return seconds < 10 ? '0' + seconds : seconds
        }

        //Setting the time that the user choosed
        sendTimePicked.addEventListener('click', () => {
            let inputValue = inputBox.value;
            customized = inputValue * 60;
            chooseTimeButton.setAttribute('data-time', customized);
            duration = chooseTimeButton.getAttribute('data-time');
            formatTime(duration);
            timePickedModal.style.display = 'none';
        })

        // Select time
        timeSelectBtn.forEach(option => {
            option.addEventListener('click', function () {
                if (option.id == 'last') {
                    inputBox.value = '';
                    timePickedModal.style.display = 'flex';
                } else {
                    duration = this.getAttribute('data-time');
                    formatTime(duration)
                }
            })
        });

        //Format and display minutes and seconds
        function formatTime(duration) {
            seconds = Math.floor(duration % 60);
            minutes = Math.floor(duration / 60);
            seconds = beautifySeconds(seconds)
            timeDisplay.textContent = `${minutes}:${seconds}`
        }

        // Stop earlier
        stop.addEventListener('click', () => {
            song.pause();
            clearInterval(countdown);
            timeDisplay.textContent = '0:00'
            outline.style.strokeDashoffset = outlineLength;
            duration = 0;
            progress = 0;
            song.currentTime = 0;
            play.src = './svg/play.svg'
            soundPicker.style.display = 'flex';
            timeSelect.style.display = 'flex';
            stop.style.display = 'none';
        })

    };

    app();

}