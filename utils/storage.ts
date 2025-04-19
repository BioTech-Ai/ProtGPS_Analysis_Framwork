// Local storage keys
export const STORAGE_KEYS = {
  HISTORY: "protgps_history",
  SAVED_PROJECTS: "protgps_saved_projects",
  SETTINGS: "protgps_settings",
}

// History item interface
export interface HistoryItem {
  id: string
  sequence: string
  timestamp: string
  results: {
    location: string
    confidence: string
    compartments: string[]
    interactions: string
    signals: string
  }
}

// Project interface
export interface SavedProject {
  id: string
  name: string
  sequence: string
  timestamp: string
  results: HistoryItem["results"]
  notes?: string
}

// Add item to history
export const addToHistory = (item: Omit<HistoryItem, "id" | "timestamp">) => {
  try {
    const history = getHistory()
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    }

    const updatedHistory = [newItem, ...history].slice(0, 50) // Keep last 50 items
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory))
    return newItem
  } catch (error) {
    console.error("Failed to add to history:", error)
    return null
  }
}

// Get history
export const getHistory = (): HistoryItem[] => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error("Failed to get history:", error)
    return []
  }
}

// Save project
export const saveProject = (project: Omit<SavedProject, "id" | "timestamp">) => {
  try {
    const savedProjects = getSavedProjects()
    const newProject: SavedProject = {
      ...project,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    }

    const updatedProjects = [newProject, ...savedProjects]
    localStorage.setItem(STORAGE_KEYS.SAVED_PROJECTS, JSON.stringify(updatedProjects))
    return newProject
  } catch (error) {
    console.error("Failed to save project:", error)
    return null
  }
}

// Get saved projects
export const getSavedProjects = (): SavedProject[] => {
  try {
    const projects = localStorage.getItem(STORAGE_KEYS.SAVED_PROJECTS)
    return projects ? JSON.parse(projects) : []
  } catch (error) {
    console.error("Failed to get saved projects:", error)
    return []
  }
}

// Delete project
export const deleteProject = (id: string) => {
  try {
    const projects = getSavedProjects()
    const updatedProjects = projects.filter((project) => project.id !== id)
    localStorage.setItem(STORAGE_KEYS.SAVED_PROJECTS, JSON.stringify(updatedProjects))
    return true
  } catch (error) {
    console.error("Failed to delete project:", error)
    return false
  }
}

// Clear history
export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY)
    return true
  } catch (error) {
    console.error("Failed to clear history:", error)
    return false
  }
}
