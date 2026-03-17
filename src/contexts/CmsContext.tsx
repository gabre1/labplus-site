import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SiteContent } from '@/types'
import { fetchSiteContent } from '@/lib/api'

interface CmsContextType {
  content: SiteContent | null
  isLoading: boolean
}

const CmsContext = createContext<CmsContextType>({ content: null, isLoading: true })

export const CmsProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSiteContent().then((data) => {
      setContent(data)
      setIsLoading(false)
    })
  }, [])

  return <CmsContext.Provider value={{ content, isLoading }}>{children}</CmsContext.Provider>
}

export const useCms = () => useContext(CmsContext)
