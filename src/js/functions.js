export function showPage (page, button) {
  const pageClassName = 'section_active'
  const buttonClassName = 'nav-list__item_active'
  page.classList.add(pageClassName)
  if (button) {
    button.classList.add(buttonClassName)
  }
}

export function hidePage (page, button) {
  const pageClassName = 'section_active'
  const buttonClassName = 'nav-list__item_active'
  page.classList.remove(pageClassName)
  if (button) {
    button.classList.remove(buttonClassName)
  }
}

export function showSomething(something, activeClass) {
  something.classList.add(activeClass)
}

export function hideSomething(something, activeClass) {
  something.classList.remove(activeClass)
}

export function crossAnswer (answer) {
  answer.classList.add('answer-block__item_false')
}

export function hideAnswer (answer) {
  answer.classList.add('answer-block__item_true')
}

export function shuffleArr (arr) {
const arr2 = arr.map((value) => {
    return [Math.random(), value]
  }).sort().map((newValue) => {
      return newValue[1]
    })
    return arr2
}

export function setAnswersList (birdsList, deckNumber, answersList) {
  const deck = shuffleArr(birdsList[deckNumber])
  answersList.forEach((value, index) => {
    if (!value.classList.contains('next-button')) {
      if(deck[index]) {
        value.innerText = deck[index].name
        value.id = deck[index].id
      }
    }
  })
}

export function setCorrectAnswer (answerList, answer) {
  answerList.forEach(value => {
    if (!value.classList.contains('next-button')) {
      if (value.innerText === answer.name) {
        value.setAttribute('data-answer', 'true')
      } else {
        value.setAttribute('data-answer', 'false')
      }
    }
  }) 
}

export function hideOldCard () {
  const oldCard = document.querySelector('.info-block_active')
  oldCard.classList.replace('info-block_active', 'info-block_hide')
  if (!oldCard.classList.contains('hello-block')) {
    oldCard.addEventListener('transitionend', function() {
      oldCard.remove()
    })
  }
}


export async function showTrueAnswer (answer) {
  const mainImg = document.querySelector('.answer-img')
  const mainText = document.querySelector('.question-block__name')
  const img = await fetch (answer.image)
  mainText.innerHTML = answer.name
  mainImg.src = img.url
  mainImg.classList.add('answer-img_active')
}

export function resetTrueAnswer () {
  const mainImg = document.querySelector('.answer-img')
  const mainText = document.querySelector('.question-block__name')
  mainText.innerHTML = '***'
  mainImg.classList.remove('answer-img_active')
}

export async function setSound (player, answer) {
  player.src = await answer.audio
}

export function setDuration (player, duration) {
  player.onloadedmetadata = function () {
  const durationInSeconds =  Math.round(player.duration)
  const seconds = durationInSeconds % 60
  const minutes = (durationInSeconds - seconds) / 60
  duration.innerText = minutes.toString().padStart(2, 0) + ':' + seconds.toString().padStart(2, 0)
  } 
}

export function showCurrentTime (player, time) {
  const timeInSeconds =  Math.round(player.currentTime)
  const seconds = timeInSeconds % 60
  const minutes = (timeInSeconds - seconds) / 60
  if (timeInSeconds > 0) {
    time.innerText = minutes.toString().padStart(2, 0) + ':' + seconds.toString().padStart(2, 0)
  }
}


export function changePlayerIcon (btn) {
  btn.closest('.player__button').classList.toggle('pause-icon')
}

export function changeMusicStatus (musicStatus) {
  return !musicStatus
}

export function toggleMusic (player, status) {
  if (!status) {
    player.pause()
  } else {
     player.play()
  }
}

export function resetCurrentTime (player, currentTimeHtml, range, progressBar) {
  player.currentTime = 0
  currentTimeHtml.innerHTML = '00:00'
  range.value = 0
  progressBar.style.width = '0%'
}

export function showProgress(player, progressBar, range) {
  const rangeProgress = Math.floor(player.currentTime / player.duration * 10000);
  progressBar.style.width = rangeProgress / 100 + '%'
  if (rangeProgress) {
     range.value = rangeProgress
  }
}

export function setProgress (player, range) {
  const val = player.duration / 100 * range.value / 100
  player.currentTime = val
}



export function setVolume (range, mainPlayer, volumeBg) {
  const val = range.value / 10000
  const descriptionPlayer = document.querySelector('.description-block__audio_active')
  if (descriptionPlayer) {
     descriptionPlayer.volume = val
  }
  mainPlayer.volume = val
  volumeBg.style.width = val * 100 + '%'
  return val
}

export function loadVolume (volume, mainPlayer, volumeBg, range) {
  mainPlayer.volume = volume
  volumeBg.style.width = volume * 100 + '%'
  range.value = volume * 10000
}

export function setOnlyVolume (range, player) {
  const val = range.value / 10000
   player.volume = val
}

export function resetAnswerList (answerList) {
  const answers = answerList.querySelectorAll('.answer-block__item')
  answers.forEach(value => {
    value.classList.remove('answer-block__item_true')
    value.classList.remove('answer-block__item_false')
    value.classList.remove('next-button_active')
  })
}

export function changeTopic (topics, level) {
  topics.forEach((value, index) => {
    if (index === level) {
      value.classList.add('topic__item_active')
    } else {
      value.classList.remove('topic__item_active')
    }
  })
}

export function resetDescription () {
  const oldCard = document.querySelector('.info-block_active')
  oldCard.classList.replace('info-block_active', 'info-block_hide')
  if (!oldCard.classList.contains('hello-block')) {
    oldCard.addEventListener('transitionend', function() {
      oldCard.remove()
    })
  }
  const hello = document.querySelector('.hello-block')
  hello.classList.replace('info-block_hide', 'info-block_active')
}

export function clickOtherButton (otherButton) {
  otherButton.dispatchEvent(new Event('click'));
}

export async function showDescription (eTarget, birdsList, currentDeckNumber) {
  const data = birdsList[currentDeckNumber].find(value => value.id.toString() === eTarget.id)
  const htmlCard = document.querySelector('.description-block')
  const jsCard = htmlCard.cloneNode(true)
  const title = jsCard.querySelector('.description-block__name')
  const latName = jsCard.querySelector('.description-block__lat-name')
  const text = jsCard.querySelector('.description-block__description')
  const bg = jsCard.querySelector('.description-block__bg')
  const player = jsCard.querySelector('.description-block__audio')
  const playerBtn = jsCard.querySelector('.player__button')
  const time = jsCard.querySelector('.player__current-time')
  const progress = jsCard.querySelector('.player__status')
  const range = jsCard.querySelector('.player__range')
  const duration = jsCard.querySelector('.player__duration')

  htmlCard.after(jsCard)
  const img = await fetch(data.image)

  player.classList.add('description-block__audio_active')
  player.src = data.audio
  title.innerHTML = data.name
  text.innerHTML = data.description
  latName.innerHTML = data.species
  bg.src = img.url
  //
  jsCard.classList.add('info-block_active')
  return {
    player: player,
    btn: playerBtn,
    time: time,
    progress: progress,
    range: range,
    duration: duration,
  }
}

export async function createCard (source, baseCard) {
  const newCard = baseCard.cloneNode(true)
  newCard.classList.remove('gallery-card_hide')
  const title = newCard.querySelector('.gallery-card__name')
  const latName = newCard.querySelector('.gallery-card__lat-name')
  const text = newCard.querySelector('.gallery-card__description')
  const bg = newCard.querySelector('.gallery-card__bg')
  const player = newCard.querySelector('.gallery-card__audio')
  const playerBtn = newCard.querySelector('.player__button')
  const time = newCard.querySelector('.player__current-time')
  const progress = newCard.querySelector('.player__status')
  const range = newCard.querySelector('.player__range')
  const duration = newCard.querySelector('.player__duration')
  const img = await fetch(source.image)
  
  bg.src = img.url
  player.src = source.audio
  title.innerHTML = source.name
  text.innerHTML = source.description
  latName.innerHTML = source.species
  baseCard.after(newCard)
  return {
    player: player,
    btn: playerBtn,
    time: time,
    progress: progress,
    range: range,
    duration: duration,
  }
}