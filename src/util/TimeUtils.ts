export const getTimeOfDay = (): string => {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return 'Morning'
  } else if (hour >= 12 && hour < 18) {
    return 'Afternoon'
  } else if (hour >= 18 && hour < 21) {
    return 'Evening'
  } else {
    return 'Night'
  }
}

/**
 * AutoTheme Component
 * Automatically selects theme based on time of day
 * 
 * Time-based theme schedule:
 * - 5:00 AM - 7:59 AM: Sunrise (soft pinks & warm yellows)
 * - 8:00 AM - 11:59 AM: Morning (warm & fresh)
 * - 12:00 PM - 5:59 PM: Afternoon (bright & energetic)
 * - 6:00 PM - 8:59 PM: Evening (soft lilac & lavender)
 * - 9:00 PM - 4:59 AM: Night (deep blues & purples)
 */

export const getThemeByTime = (): string => {
  const hour = new Date().getHours()
  
  // 5 AM - 7:59 AM: Sunrise
  if (hour >= 5 && hour < 8) {
    return 'sunrise'
  }
  // 8 AM - 11:59 AM: Morning
  else if (hour >= 8 && hour < 12) {
    return 'morning'
  }
  // 12 PM - 5:59 PM: Afternoon
  else if (hour >= 12 && hour < 18) {
    return 'afternoon'
  }
  // 6 PM - 8:59 PM: Evening
  else if (hour >= 18 && hour < 21) {
    return 'evening'
  }
  // 9 PM - 4:59 AM: Night
  else {
    return 'night'
  }
}