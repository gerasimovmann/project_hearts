import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Heart.module.css'
import { IoIosHeart } from 'react-icons/io'

const Heart = ({ heart }) => {
  return (
    <div
      style={{
        top: heart.clientY,
        left: heart.clientX,
        color: heart.color,
        '--transformScale': heart.scale,
        '--transformMove2': heart.transformX,
      }}
      className={styles.heart}
    >
      <IoIosHeart />
    </div>
  )
}

export default Heart
