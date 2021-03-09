Tone.start();

const synth = new Tone.Synth().toDestination()

var section = 4
let recordingStartTime
let songNotes = currentSong && currentSong.notes
const recordButton = document.querySelector('.record-button')
const playButton = document.querySelector('.play-button')
const saveButton = document.querySelector('.save-button')
const viewSong = document.querySelector('.view-song')


console.log(currentSong)
document.onkeydown = function(e) {
    e = e || window.event
    var key = e.which || e.keyCode
    if (key === 83) {
        playNote('C', e.shiftKey, section)
    }
    if (key === 68) {
        playNote('D', e.shiftKey, section)
    }
    if (key === 70) {
        playNote('E', e.shiftKey, section)
    }
    if (key === 71) {
        playNote('F', e.shiftKey, section)
    }
    if (key === 72) {
        playNote('G', e.shiftKey, section)
    }
    if (key === 74) {
        playNote('A', e.shiftKey, section)
    }
    if (key === 75) {
        playNote('B', e.shiftKey, section)
    }
    if (key === 37) {
        if (section > 1) {
            section -= 1;
            document.getElementById('sectionNo').innerText = section
        } else {
            alert("The lowest keyboard section is 1.")
        }
    }
    if (key === 39) {
        if (section < 8) {
            section += 1;
            document.getElementById('sectionNo').innerText = section
        } else {
            alert("The highest keyboard section is 8.")
        }
    }
}

function playNote(note, shift, section) {
  synth.triggerAttackRelease(`${note}${(shift) ? '#' : ''}${section}`, "8n");
    document.getElementById(note).style.background = (shift) ? '#338eda' : '#33d6a6';
    setTimeout(() => {
        document.getElementById(note).style.background = 'white'
    }, 150)

    if(isRecording()) recordNote(`${note}`, `${shift}`, `${section}`)
}

if(recordButton){
    recordButton.addEventListener('click', toggleRecording)
}

if (saveButton){
    saveButton.addEventListener('click', saveSong)
}
playButton.addEventListener('click', playSong)

function toggleRecording() {
    recordButton.classList.toggle('active')
    if(isRecording()){
        startRecording()
    } else{
        stopRecording()
    }
}

function isRecording(){
    return recordButton != null && recordButton.classList.contains('active')
}

function startRecording() {
    recordingStartTime = Date.now()
    songNotes = []
    playButton.classList.remove('show')
    saveButton.classList.remove('show')
}

function stopRecording() {
    playSong()
    playButton.classList.add('show')
    saveButton.classList.add('show')
  }

  function playSong() {
      if(songNotes.length === 0){
           return
      }
      console.log(songNotes)
      songNotes.forEach(note => {
          setTimeout(() => {
              playNote(note.key, note.keyShift, note.keySection)
      }, note.startTime)
    })
  }

function recordNote(note, shift, section){
    songNotes.push({
        key: note,
        keyShift: shift,
        keySection: section,
        startTime: Date.now() - recordingStartTime
    })
}

function saveSong(){
    axios.post('/songs', { songNotes: songNotes }).then(res => {
        viewSong.classList.add('show')
        viewSong.href = `/songs/${res.data._id}`
        console.log(res.data)
      })
}