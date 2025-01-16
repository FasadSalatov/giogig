import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5'

interface ArticleRatingProps {
  initialRating: number
  totalVotes: number
  onRate?: (rating: number) => void
}

export default function ArticleRating({ initialRating, totalVotes, onRate }: ArticleRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)

  const handleRate = (value: number) => {
    if (!hasVoted) {
      setRating(value)
      setHasVoted(true)
      onRate?.(value)
    }
  }

  const renderStar = (index: number) => {
    const value = index + 1
    const filled = hoverRating ? value <= hoverRating : value <= rating
    const half = !hoverRating && value === Math.ceil(rating) && !Number.isInteger(rating)

    return (
      <motion.button
        key={index}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`text-2xl ${
          hasVoted ? 'cursor-default' : 'cursor-pointer'
        } ${
          filled ? 'text-[#F1DA8B]' : 'text-white/20'
        }`}
        onMouseEnter={() => !hasVoted && setHoverRating(value)}
        onMouseLeave={() => !hasVoted && setHoverRating(0)}
        onClick={() => handleRate(value)}
        disabled={hasVoted}
      >
        {half ? <IoStarHalf /> : filled ? <IoStar /> : <IoStarOutline />}
      </motion.button>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => renderStar(index))}
      </div>
      <div className="text-sm text-white/60">
        {rating.toFixed(1)} из 5 ({totalVotes} {getVotesText(totalVotes)})
      </div>
      {hasVoted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-[#F1DA8B]"
        >
          Спасибо за вашу оценку!
        </motion.div>
      )}
    </div>
  )
}

function getVotesText(votes: number): string {
  const lastDigit = votes % 10
  const lastTwoDigits = votes % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'оценок'
  }

  if (lastDigit === 1) {
    return 'оценка'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'оценки'
  }

  return 'оценок'
}
