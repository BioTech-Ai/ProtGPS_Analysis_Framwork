interface AnalyticsEvent {
  type: string
  data: Record<string, any>
  timestamp: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private readonly MAX_EVENTS = 1000

  trackEvent(type: string, data: Record<string, any>) {
    try {
      const event: AnalyticsEvent = {
        type,
        data,
        timestamp: Date.now(),
      }

      this.events.push(event)

      // Keep only the last MAX_EVENTS events
      if (this.events.length > this.MAX_EVENTS) {
        this.events = this.events.slice(-this.MAX_EVENTS)
      }

      // Store in localStorage
      localStorage.setItem("protgps_analytics", JSON.stringify(this.events))

      return true
    } catch (error) {
      console.error("Failed to track event:", error)
      return false
    }
  }

  getEvents(type?: string) {
    try {
      const events = type ? this.events.filter((event) => event.type === type) : this.events

      return events.sort((a, b) => b.timestamp - a.timestamp)
    } catch (error) {
      console.error("Failed to get events:", error)
      return []
    }
  }

  getStats() {
    try {
      const stats = {
        totalAnalyses: 0,
        successfulAnalyses: 0,
        averageConfidence: 0,
        mostCommonLocation: "",
        recentActivity: [],
      }

      const analyses = this.events.filter((event) => event.type === "analysis")
      stats.totalAnalyses = analyses.length

      const successful = analyses.filter((event) => event.data.success)
      stats.successfulAnalyses = successful.length

      const confidenceSum = successful.reduce((sum, event) => {
        return sum + (event.data.confidence === "high" ? 1 : event.data.confidence === "medium" ? 0.5 : 0)
      }, 0)
      stats.averageConfidence = successful.length ? confidenceSum / successful.length : 0

      const locations = successful.reduce(
        (acc, event) => {
          const location = event.data.location
          acc[location] = (acc[location] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      stats.mostCommonLocation = Object.entries(locations).sort(([, a], [, b]) => b - a)[0]?.[0] || ""

      stats.recentActivity = this.events.slice(-10).map((event) => ({
        type: event.type,
        timestamp: event.timestamp,
        summary: this.getEventSummary(event),
      }))

      return stats
    } catch (error) {
      console.error("Failed to get stats:", error)
      return null
    }
  }

  private getEventSummary(event: AnalyticsEvent) {
    switch (event.type) {
      case "analysis":
        return `Analyzed sequence with ${event.data.confidence} confidence`
      case "export":
        return `Exported analysis as ${event.data.format}`
      case "share":
        return `Shared analysis with ${event.data.type} link`
      default:
        return `${event.type} event`
    }
  }

  clearEvents() {
    try {
      this.events = []
      localStorage.removeItem("protgps_analytics")
      return true
    } catch (error) {
      console.error("Failed to clear events:", error)
      return false
    }
  }
}

export const analytics = new Analytics()
