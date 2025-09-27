import {vi, describe, test, expect, beforeEach} from 'vitest'
import { HandleSwiperSlidesPerView } from '@/lib/SwiperSlidesPerViewUtil'
import { useIsMobile } from '@/hooks/use-mobile'
import { useIsTablet } from '@/hooks/use-tablet'

// Mock the hooks directly - don't wrap in arrow functions
vi.mock('@/hooks/use-mobile', () => ({
    useIsMobile: vi.fn()  // Direct reference, not () => mockUseIsMobile()
}))

vi.mock('@/hooks/use-tablet', () => ({
    useIsTablet: vi.fn(),  // Direct reference, not () => mockUseIsTablet()
}))

describe('HandleSwiperSlidesPerView', () => {
    const mockUseIsMobile = vi.mocked(useIsMobile)
    const mockUseIsTablet = vi.mocked(useIsTablet)

    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('returns mobile slides per view for mobile devices', () => {
        // Arrange
        mockUseIsMobile.mockReturnValue(true)
        mockUseIsTablet.mockReturnValue(false)

        // Act
        const result = HandleSwiperSlidesPerView()

        // Assert
        expect(result).toBe(1)
        expect(mockUseIsMobile).toHaveBeenCalledOnce()
        expect(mockUseIsTablet).toHaveBeenCalledOnce()
    })


    test('returns tablet slides per view for tablet devices', () => {
        // Arrange
        mockUseIsMobile.mockReturnValue(false)
        mockUseIsTablet.mockReturnValue(true)

        // Act
        const result = HandleSwiperSlidesPerView()

        // Assert
        expect(result).toBe(1)
    })

    test('returns desktop slides per view for desktop devices', () => {
        // Arrange
        mockUseIsMobile.mockReturnValue(false)
        mockUseIsTablet.mockReturnValue(false)

        // Act
        const result = HandleSwiperSlidesPerView()

        // Assert
        expect(result).toBe(1.5)
    })
});
