const AMINO_ACIDS = new Set([
  "A",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "V",
  "W",
  "Y",
])

export const validateSequence = (sequence: string) => {
  if (!sequence) {
    return {
      isValid: false,
      error: "Sequence is required",
    }
  }

  const upperSequence = sequence.toUpperCase()
  const invalidChars = [...upperSequence].filter((char) => !AMINO_ACIDS.has(char))

  if (invalidChars.length > 0) {
    return {
      isValid: false,
      error: `Invalid amino acids: ${[...new Set(invalidChars)].join(", ")}`,
    }
  }

  if (sequence.length < 10) {
    return {
      isValid: false,
      error: "Sequence must be at least 10 amino acids long",
    }
  }

  if (sequence.length > 1000) {
    return {
      isValid: false,
      error: "Sequence must not exceed 1000 amino acids",
    }
  }

  return {
    isValid: true,
  }
}

export const formatSequence = (sequence: string) => {
  return (
    sequence
      .toUpperCase()
      .match(/.{1,10}/g)
      ?.join(" ") || sequence
  )
}

export const calculateStats = (sequence: string) => {
  const counts: Record<string, number> = {}
  const upperSequence = sequence.toUpperCase()

  for (const acid of upperSequence) {
    counts[acid] = (counts[acid] || 0) + 1
  }

  const total = sequence.length
  const composition = Object.entries(counts).map(([acid, count]) => ({
    acid,
    count,
    percentage: (count / total) * 100,
  }))

  return {
    length: total,
    composition: composition.sort((a, b) => b.count - a.count),
    unique: Object.keys(counts).length,
  }
}
