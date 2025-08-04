"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export default function TypingAnimation({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
}: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false)
          setIsDeleting(true)
          return
        }

        const fullText = texts[currentTextIndex]

        if (isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length - 1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length + 1))

          if (currentText === fullText) {
            setIsPaused(true)
          }
        }
      },
      isPaused ? pauseTime : isDeleting ? deleteSpeed : speed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseTime])

  return (
    <span className="relative">
      <span className="font-mono">{currentText}</span>
      <span className="animate-pulse ml-1 text-amber-600">|</span>
    </span>
  )
}
