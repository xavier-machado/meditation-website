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
        const arrowBack = document.querySelector('.arrow-back')

        // Sounds
        const soundPicker = document.querySelector('.sound-picker'); // get the div of the sound buttons do display none when playing
        const sounds = document.querySelectorAll('.sound-picker button'); // buttons within the sound picker div
        // Time Display
        const timeSelect = document.querySelector('.time-select'); // get the div of the timer buttons do display none when playing
        const timeDisplay = document.querySelector('.time-display h3'); // time display <h3>
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
                arrowBack.style.display = 'none';
                var total = duration;
                countdown = setInterval(() => {
                    duration--;
    
                    // Animate the circle
                    console.log(progress);
                    progress = outlineLength * (duration / total);
                    outline.style.strokeDashoffset = progress;
    
                    // Animate the text
                    timeDisplay.textContent = secondsToHms(duration);
    
                    if (duration <= 0) {
                        clearInterval(countdown);
                        song.pause();
                        duration = 0;
                        outline.style.strokeDashoffset = outlineLength;
                        song.currentTime = 0;
                        // end.play();
                        play.src = './svg/play.svg'
                        soundPicker.style.display = 'flex';
                        timeSelect.style.display = 'flex';
                        stop.style.display = 'none';
                        arrowBack.style.display = 'flex';
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

        // Time fomration
        function secondsToHms(d) {
            d = Number(d);
        
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);
        
            return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
        }


        // Display seconds with double digits
        // const beautifySeconds = (seconds) => {
        //     return seconds < 10 ? '0' + seconds : seconds
        // }

        //Setting the time that the user choosed
        sendTimePicked.addEventListener('click', () => {
            let inputValue = inputBox.value;
            customized = inputValue * 60;
            chooseTimeButton.setAttribute('data-time', customized);
            duration = chooseTimeButton.getAttribute('data-time');
            timeDisplay.textContent = secondsToHms(duration);
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
                    timeDisplay.textContent = secondsToHms(duration);
                }
            })
        });

        // Stop earlier
        stop.addEventListener('click', () => {
            song.pause();
            clearInterval(countdown);
            timeDisplay.textContent = '00:00:00'
            outline.style.strokeDashoffset = outlineLength;
            duration = 0;
            progress = 0;
            song.currentTime = 0;
            play.src = './svg/play.svg'
            soundPicker.style.display = 'flex';
            timeSelect.style.display = 'flex';
            stop.style.display = 'none';
            arrowBack.style.display = 'flex';
        })

    };

    app();

}