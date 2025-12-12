import { create } from 'zustand'
import type { TradeIdea, LoadingState } from '@/types'

interface TradeStore extends LoadingState {
  // State
  ideas: TradeIdea[]
  archivedIdeas: TradeIdea[]

  // Actions
  setIdeas: (ideas: TradeIdea[]) => void
  addIdea: (idea: TradeIdea) => void
  archiveIdea: (id: string) => void
  rateIdea: (id: string, outcome: 'win' | 'loss' | 'scratch') => void
  clearIdeas: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void

  // Computed selectors
  getActiveIdeas: () => TradeIdea[]
  getIdeaById: (id: string) => TradeIdea | undefined
  getIdeasBySymbol: (symbol: string) => TradeIdea[]
  getArchivedIdeas: () => TradeIdea[]
}

export const useTradeStore = create<TradeStore>((set, get) => ({
  // Initial state
  ideas: [],
  archivedIdeas: [],
  isLoading: false,
  error: null,

  // Actions
  setIdeas: (ideas) => set({ ideas }),

  addIdea: (idea) => set((state) => ({
    ideas: [idea, ...state.ideas],
  })),

  archiveIdea: (id) => set((state) => {
    const idea = state.ideas.find((i) => i.id === id)
    if (!idea) return state

    const updatedIdea = { ...idea, status: 'archived' as const }
    return {
      ideas: state.ideas.filter((i) => i.id !== id),
      archivedIdeas: [updatedIdea, ...state.archivedIdeas],
    }
  }),

  rateIdea: (id, outcome) => set((state) => {
    const updateIdeas = (ideas: TradeIdea[]) =>
      ideas.map((idea) =>
        idea.id === id
          ? { ...idea, outcome, status: 'completed' as const }
          : idea
      )

    return {
      ideas: updateIdeas(state.ideas),
      archivedIdeas: updateIdeas(state.archivedIdeas),
    }
  }),

  clearIdeas: () => set({ ideas: [], archivedIdeas: [] }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  // Computed selectors
  getActiveIdeas: () => {
    return get().ideas.filter((idea) => idea.status === 'active')
  },

  getIdeaById: (id) => {
    const { ideas, archivedIdeas } = get()
    return ideas.find((i) => i.id === id) || archivedIdeas.find((i) => i.id === id)
  },

  getIdeasBySymbol: (symbol) => {
    return get().ideas.filter((idea) => idea.symbol === symbol)
  },

  getArchivedIdeas: () => {
    return get().archivedIdeas
  },
}))
