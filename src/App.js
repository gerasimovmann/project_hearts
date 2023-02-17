import { useState } from 'react'
import './App.css'
import Heart from './components/Heart'

import { useEffect } from 'react'
import style from './components/Heart.module.css'

function App() {
  const [heart, setHeart] = useState([]) // heart state
  const [mousePress, setMousePress] = useState(false) // mousePress
  const [tick, setTick] = useState(0) // tick
  const [intervalId, setIntervalId] = useState() // interval 1
  const [intervalId2, setIntervalId2] = useState() // interval 2
  const [mouseClient, setMouseClient] = useState({}) // Info Mouse move
  const [colors, setColor] = useState([
    // colors
    '#f8034c',
    '#f71659',
    '#f5356f',
    '#f85586',
    '#f8789e',
    '#f79eb9',
    '#f8b9cc',
  ])

  //function for genColor
  const randomColor = () => {
    const randomNum = Math.floor(Math.random() * (5 - 0)) + 0
    return colors[randomNum]
  }
  //function for genScale
  const randomScale = () => {
    const randomNum = (Math.random() * (1.3 - 0.7) + 0.7).toFixed(1)
    return `scale(${randomNum})`
  }
  //function for genTranslateX
  const randomTranslateX = () => {
    const arr = ['60px', '-60px']
    let rand = 0 + Math.random() * (1 + 1 - 0)
    return arr[Math.floor(rand)]
  }

  //Delete old hearts
  useEffect(() => {
    setIntervalId2(
      setTimeout(
        () => setHeart(heart.filter((el) => el.timeEnd > Date.now())),
        2000
      )
    )
    return clearInterval(intervalId2)
  }, [mouseClient])

  //tickInterval
  useEffect(() => {
    if (mousePress === true) {
      setIntervalId(setInterval(() => setTick((prev) => prev + 1), 130))
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [mousePress])

  // eventMouseMove
  useEffect(() => {
    window.addEventListener('mousemove', eventMouseOnFunc)
    return () => window.removeEventListener('mousemove', eventMouseOnFunc)
  })
  //Add info Mouse Move
  const eventMouseOnFunc = (e) =>
    setMouseClient({
      clientX: e.clientX,
      clientY: e.clientY,
      timeEnd: Date.now() + 3000,
      color: randomColor(),
      scale: randomScale(),
      transformX: randomTranslateX(),
    })
  //Add Hearts in state
  useEffect(() => {
    setHeart((prev) => [...prev, mouseClient])
  }, [tick])

  return (
    <div
      className='App'
      onMouseDown={(e) => {
        setHeart([
          ...heart,
          {
            clientX: e.clientX,
            clientY: e.clientY,
            timeEnd: Date.now() + 3000,
            color: randomColor(),
            scale: randomScale(),
            transformX: randomTranslateX(),
          },
        ])
        console.log('нажали на кнопку')
        setMousePress(true)
      }}
      onMouseUp={() => {
        setMousePress(false)
        clearInterval(intervalId)
        console.log('отпустили кнопку')
      }}
    >
      {heart.map((el, id) => (
        <Heart heart={el} key={id} />
      ))}
    </div>
  )
}

export default App
