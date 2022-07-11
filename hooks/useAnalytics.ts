// src/hooks/useAnalytics.ts
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// make typescript happy
declare global {
  interface Window {
    goatcounter?: any
  }
}

export function useAnalyticsInstance() {
  const router = useRouter()
  useEffect(() => {
    const onRouteChangeComplete = () => {
      if (window.goatcounter === undefined) return
      window.goatcounter.count({
        path: location.pathname + location.search + location.hash,
      })
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])
}

export function useAnalyticsEvent() {
    function trackCustomEvent({
      eventName,
      eventTitle,
    }: {
      eventName: string
      eventTitle?: string
    }) {
      if (window.goatcounter === undefined) return
  // still counting just like we do for route changes
      window.goatcounter.count({
        path: eventName, 
        title: eventTitle || eventName,
  // only this time the event property is set to true
        event: true,
      })
    }
  
    return { trackCustomEvent }
  }