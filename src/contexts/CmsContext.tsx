import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { fetchSiteContent } from '@/lib/api'

interface CmsContextType {
  content: any | null
  isLoading: boolean
  refreshContent: () => Promise<void>
}

const CmsContext = createContext<CmsContextType>({
  content: null,
  isLoading: true,
  refreshContent: async () => {},
})

export const CmsProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshContent = async () => {
    setIsLoading(true)
    const data = await fetchSiteContent()
    setContent(data)
    setIsLoading(false)
  }

  useEffect(() => {
    refreshContent()
  }, [])

  return (
    <CmsContext.Provider value={{ content, isLoading, refreshContent }}>
      {children}
    </CmsContext.Provider>
  )
}

export const useCms = () => useContext(CmsContext)
