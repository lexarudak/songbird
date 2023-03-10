import './index.html'
import './index.scss'
import './images/bird-video.mp4'
import './images/bird-video.webm'
import './images/random-bird.jpeg'
import './images/play-icon.svg'
import './images/pause-icon.svg'
import enBirds from './js/enBirds'
import ruBirds from './js/ruBirds'
import { createCard, clickOtherButton, resetDescription, changeTopic, resetAnswerList, resetTrueAnswer, setOnlyVolume, loadVolume, setVolume, setProgress, resetCurrentTime, showProgress, showCurrentTime, setDuration, toggleMusic, changeMusicStatus, changePlayerIcon, showTrueAnswer, hideOldCard, showDescription, setSound, setCorrectAnswer, setAnswersList, hideAnswer, crossAnswer, hidePage, hideSomething, showPage, showSomething, shuffleArr, } from './js/functions'

const logoBtn = document.querySelector('.logo-icon')
const homeBtn = document.querySelector('.home-button')
const playBtn = document.querySelector('.play-button')
const nextBtn = document.querySelector('.next-button')
const langBtn = document.querySelector('.lang-button')
const galleryBtn = document.querySelector('.gallery-button')
const burgerBtn = document.querySelector('.burger-button')
const footer = document.querySelector('footer')
const errorSound = document.querySelector('.errorSound')
const successSound = document.querySelector('.successSound')
const homeSection = document.querySelector('.home-section')
const playSection = document.querySelector('.play-section')
const scoreSection = document.querySelector('.score-section')
const gallerySection = document.querySelector('.gallery-section')
const answerList = document.querySelector('.answer-block__list')
const scoreNum = document.querySelector('.score__num') 
const topics = document.querySelectorAll('.topic__item')
const answersList = document.querySelectorAll('.answer-block__item')
const enText = document.querySelectorAll('.en')
const ruText = document.querySelectorAll('.ru')
const scoreTitle = document.querySelector('.score-section__title')
const scorePoints = document.querySelector('.score-section__points')
const scoreBtn = document.querySelector('.score-section__button')
const bgCover = document.querySelector('.bg-cover')
const navList = document.querySelector('.nav-list')
const galleryCard = document.querySelector('.gallery-card')
const galleryList = document.querySelector('.gallery-list')

  


// Question Player const 

const questionPlayerBlock = document.querySelector('.question-block__sound')
const questionPlayer = questionPlayerBlock.querySelector('.question-block__audio')
const questionPlayerBtn = questionPlayerBlock.querySelector('.player__button')
const questionPlayerDuration = questionPlayerBlock.querySelector('.player__duration')
const questionPlayerTime = questionPlayerBlock.querySelector('.player__current-time')
const questionPlayerProgress = questionPlayerBlock.querySelector('.player__status')
const questionPlayerRange = questionPlayerBlock.querySelector('.player__range')
const volumeRange = questionPlayerBlock.querySelector('.player__volume-range')
const volumeBg = questionPlayerBlock.querySelector('.player__volume')

// let

let lang = 'en'
let volume = 1
let birdsList
let currentDeckNumber = 0
let level = 0
let score = 0
let currentPoints = 5
let answer
let isQuestionMusicPlay = false
let isDescriptionMusicPlay = false
let isGalleryMusicPlay = false
let isRoundActive = true
let falseAnswers = []



// listeners 

logoBtn.addEventListener('click', function() {
  showPage(homeSection, homeBtn)
  hidePage(playSection, playBtn)
  hidePage(gallerySection, galleryBtn)
  hidePage(scoreSection)
  hideSomething(scoreBtn, 'score-section__button_active')
  showSomething(footer, 'footer_active')
})

homeBtn.addEventListener('click', function() {
  showPage(homeSection, homeBtn)
  hidePage(playSection, playBtn)
  hidePage(gallerySection, galleryBtn)
  hidePage(scoreSection)
  hideSomething(scoreBtn, 'score-section__button_active')
  showSomething(footer, 'footer_active')
})

playBtn.addEventListener('click', function() {
  showPage(playSection, playBtn)
  hidePage(homeSection, homeBtn)
  hidePage(gallerySection, galleryBtn)
  hidePage(scoreSection)
  hideSomething(scoreBtn, 'score-section__button_active')
  hideSomething(footer, 'footer_active')
})

galleryBtn.addEventListener('click', function() {
  showPage(gallerySection, galleryBtn)
  hidePage(homeSection, homeBtn)
  hidePage(playSection, playBtn)
  hidePage(scoreSection)
  hideSomething(scoreBtn, 'score-section__button_active')
    hideSomething(footer, 'footer_active')
})

scoreBtn.addEventListener('click', function(e) {
  clickOtherButton(nextBtn)
  showPage(playSection, playBtn)
})

burgerBtn.addEventListener('click', function() {
  burgerBtn.classList.toggle('burger-button_active')
  bgCover.classList.toggle('bg-cover_active')
  navList.classList.toggle('nav-list_active')
  document.body.classList.toggle('body_block')
})

navList.addEventListener('click', function (e) {
  if (navList.classList.contains('nav-list_active') && e.target.closest('.nav-list__item')) {
    burgerBtn.classList.toggle('burger-button_active')
    bgCover.classList.toggle('bg-cover_active')
    navList.classList.toggle('nav-list_active')
    document.body.classList.toggle('body_block')
  }
})

bgCover.addEventListener('click', function () {
   burgerBtn.classList.toggle('burger-button_active')
  bgCover.classList.toggle('bg-cover_active')
  navList.classList.toggle('nav-list_active')
  document.body.classList.toggle('body_block')
})

langBtn.addEventListener('click', function () {
  if (lang === 'ru') {
    localStorage.setItem('lang', 'en')
    lang = 'en'
  } else {
    localStorage.setItem('lang', 'ru')
    lang = 'ru'
  }
  location.reload()
})

questionPlayerBtn.addEventListener('click', function(e) {
  changePlayerIcon(e.target, isQuestionMusicPlay)
  isQuestionMusicPlay = changeMusicStatus(isQuestionMusicPlay)
  toggleMusic(questionPlayer, isQuestionMusicPlay)
})

questionPlayer.addEventListener('timeupdate', function() {
  showCurrentTime(questionPlayer, questionPlayerTime)
  showProgress(questionPlayer, questionPlayerProgress, questionPlayerRange)
})

questionPlayerRange.addEventListener('input', function () {
  setProgress(questionPlayer, questionPlayerRange)
})

volumeRange.addEventListener('input', function () {
  volume = setVolume(volumeRange, questionPlayer, volumeBg)
  localStorage.setItem('volume', volume)
  setOnlyVolume(volumeRange, errorSound)
  setOnlyVolume(volumeRange, successSound)
})

questionPlayer.onended = function () {
  changePlayerIcon(questionPlayerBtn, isQuestionMusicPlay)
  isQuestionMusicPlay = changeMusicStatus(isQuestionMusicPlay)
  toggleMusic(questionPlayer, isQuestionMusicPlay)
  resetCurrentTime(questionPlayer, questionPlayerTime, questionPlayerRange, questionPlayerProgress)
}

answerList.addEventListener('click', async (e) => {
  if (!e.target.closest('.next-button') && e.target.closest('li')) {
    hideOldCard ()  
    isDescriptionMusicPlay = false
    const descriptionPlayer = await showDescription(e.target, birdsList, currentDeckNumber)
    loadVolume(volume, descriptionPlayer.player, volumeBg, volumeRange)
    setDuration(descriptionPlayer.player, descriptionPlayer.duration)
    descriptionPlayer.btn.addEventListener('click', function(e) {
      changePlayerIcon(e.target, isDescriptionMusicPlay)
      isDescriptionMusicPlay = changeMusicStatus(isDescriptionMusicPlay)
      toggleMusic(descriptionPlayer.player, isDescriptionMusicPlay)
    })
    descriptionPlayer.player.addEventListener('timeupdate', function() {
      showCurrentTime(descriptionPlayer.player, descriptionPlayer.time)
      showProgress(descriptionPlayer.player, descriptionPlayer.progress, descriptionPlayer.range)
    })
    descriptionPlayer.range.addEventListener('input', function () {
      setProgress(descriptionPlayer.player, descriptionPlayer.range)
    })
    descriptionPlayer.player.onended = function () {
      changePlayerIcon(e.target, isDescriptionMusicPlay)
      isDescriptionMusicPlay = changeMusicStatus(isDescriptionMusicPlay)
      toggleMusic(descriptionPlayer.player, isDescriptionMusicPlay)
      resetCurrentTime(descriptionPlayer.player, descriptionPlayer.time, descriptionPlayer.range)
    }
// false
    if (e.target.dataset.answer === 'false' && isRoundActive) {
      crossAnswer(e.target)
      errorSound.play()
      if (currentPoints !== 0) {
        if (!falseAnswers.includes(e.target.id)) {
           currentPoints--
        }
       falseAnswers.push(e.target.id)
      }
     console.log(currentPoints);
    }
// true
    if (e.target.dataset.answer === 'true' && isRoundActive) {
      hideAnswer(e.target)
      showSomething(nextBtn, 'next-button_active')
      showTrueAnswer(answer)
      successSound.play()
      nextBtn.classList.remove('next-button_new-text')
      isRoundActive = false
      falseAnswers = []
      if (level > 0) {
        score = score + currentPoints
        scoreNum.innerHTML = score
      }
      if (isQuestionMusicPlay) {
        changePlayerIcon(questionPlayerBtn)
        questionPlayer.pause()
        isQuestionMusicPlay = false
      }
      if (level === 5) {
        nextBtn.classList.add('next-button_new-text')
        
      if (lang === 'en') {
           if (score === 25) {
             scoreTitle.innerHTML = 'Win!'
           } else {
             scoreTitle.innerHTML = 'Game over'
             showSomething(scoreBtn, 'score-section__button_active')
           }
        } else {
          if (score === 25) {
             scoreTitle.innerHTML = 'Победа!'
           } else {
             showSomething(scoreBtn, 'score-section__button_active')
             scoreTitle.innerHTML = 'Конец игры'
           }
        }
      scorePoints.innerHTML = score
      showPage(scoreSection)
      hidePage(playSection, playBtn)
      }
    }
  }
})

// next button

nextBtn.addEventListener('click', function() {
    currentDeckNumber++
  if (level === 5) {
    // reset game
    level = 0
    currentDeckNumber = 0
    answer = shuffleArr(birdsList[level])[0]
    score = 0
    scoreNum.innerHTML = score
    
  } else {
    level++
    answer = shuffleArr(birdsList[level])[0]
  }
  console.log(answer);
  
  currentPoints = 5
  isRoundActive = true
  resetTrueAnswer()
  resetAnswerList(answerList)
  changeTopic(topics, level)
  resetDescription()
  setAnswersList(birdsList, currentDeckNumber, answersList)
  setCorrectAnswer(answersList, answer)
  resetCurrentTime(questionPlayer, questionPlayerTime, questionPlayerRange, questionPlayerProgress)
  setSound(questionPlayer, answer, questionPlayerDuration)
  setDuration(questionPlayer, questionPlayerDuration)
  questionPlayerBtn.classList.remove('pause-icon')
  isQuestionMusicPlay = false
})

// load page

const savedLang = localStorage.getItem('lang')
if (savedLang !== null) {
  lang = savedLang
}

const savedVolume = localStorage.getItem('volume')
if (savedVolume !== null) {
  volume = savedVolume
}

if (lang === 'ru') {
  enText.forEach(value => value.classList.add('hide-text'))
  birdsList = ruBirds
} else {
  ruText.forEach(value => value.classList.add('hide-text'))
  birdsList = enBirds
}

answer = shuffleArr(birdsList[level])[0]
setAnswersList(birdsList, currentDeckNumber, answersList)
setCorrectAnswer(answersList, answer)
setSound(questionPlayer, answer, questionPlayerDuration)
setDuration(questionPlayer, questionPlayerDuration)
loadVolume(volume, questionPlayer, volumeBg, volumeRange)
errorSound.volume = volume
successSound.volume = volume


// load gallery

birdsList.forEach(value => {
  value.forEach(async function (val) {
    const newCard = await createCard(val, galleryCard)

    newCard.player.onloadedmetadata = function () {
      const durationInSeconds =  Math.round(newCard.player.duration)
      const seconds = durationInSeconds % 60
      const minutes = (durationInSeconds - seconds) / 60
      newCard.duration.innerText = minutes.toString().padStart(2, 0) + ':' + seconds.toString().padStart(2, 0)
      newCard.btn.addEventListener('click', function(e) {
        const activeBtn = galleryList.querySelector('.pause-icon')
        if (activeBtn && activeBtn !== e.target.closest('.player__button')) {
          clickOtherButton(activeBtn)
        }
        newCard.player.volume = volume
        changePlayerIcon(e.target, isGalleryMusicPlay)
        isGalleryMusicPlay = changeMusicStatus(isGalleryMusicPlay)
        toggleMusic(newCard.player, isGalleryMusicPlay)
        })   
      }
      newCard.player.addEventListener('timeupdate', function() {
        showCurrentTime(newCard.player, newCard.time)
        showProgress(newCard.player, newCard.progress, newCard.range)
      })
      newCard.range.addEventListener('input', function () {
        setProgress(newCard.player, newCard.range)
      })
      newCard.player.onended = function () {
        changePlayerIcon(newCard.btn, isGalleryMusicPlay)
        isGalleryMusicPlay = changeMusicStatus(isGalleryMusicPlay)
        toggleMusic(newCard.player, isGalleryMusicPlay)
        resetCurrentTime(newCard.player, newCard.time, newCard.range, newCard.progress)
      }
  })
})






    

