import { useEffect, useState } from "react"

interface TypingEffectProps {
  text: string
  speed?: number // Time in milliseconds between each word
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 300 }) => {
  const [displayedText, setDisplayedText] = useState<string>("")

  useEffect(() => {
    const words = text.split(" ")
    let index = 0
    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => `${prev} ${words[index]}`)
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [text, speed])

  return <p>{displayedText.trim()}</p>
}

export default TypingEffect
