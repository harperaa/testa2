"use client"

import * as React from "react"
import { useConvexAuth, useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { localDateString } from "@/lib/fitness"

/**
 * Loads dashboard data only after Convex auth is ready.
 * Never calls ensureProfile while signed out (avoids noisy server errors).
 */
export function useFitnessDashboard(date?: string) {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth()
  const day = date ?? localDateString()
  const ensureProfile = useMutation(api.fitness.ensureProfile)
  const [profileEnsured, setProfileEnsured] = React.useState(false)

  const dashboard = useQuery(
    api.fitness.getDashboard,
    isAuthenticated ? { date: day } : "skip"
  )
  const profile = useQuery(
    api.fitness.getProfile,
    isAuthenticated ? {} : "skip"
  )

  React.useEffect(() => {
    if (!isAuthenticated) {
      setProfileEnsured(false)
      return
    }

    let cancelled = false
    setProfileEnsured(false)

    ;(async () => {
      try {
        await ensureProfile({})
      } catch {
        // Auth race or network blip — queries may still work after retry
      } finally {
        if (!cancelled) setProfileEnsured(true)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, ensureProfile])

  const loading =
    authLoading ||
    (isAuthenticated && (!profileEnsured || dashboard === undefined))

  return {
    date: day,
    dashboard: dashboard ?? null,
    profile: profile ?? null,
    loading,
    isAuthenticated,
    authLoading,
  }
}
