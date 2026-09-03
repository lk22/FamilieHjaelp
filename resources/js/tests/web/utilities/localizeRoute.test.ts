import { localizeRoute } from '@/util/localizeRoute'
import { describe, test, expect, vi, afterEach } from 'vitest'

describe('localizeRoute', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('returns a function that localizes routes based on the given locale', () => {
    const ziggyRoute = vi.fn(() => "/da/funktioner")

    vi.stubGlobal('route', ziggyRoute)

    expect(localizeRoute('da')('page.functions')).toBe('/da/funktioner')

    expect(ziggyRoute).toHaveBeenCalledWith('page.functions', { locale: 'da' })
  })
})