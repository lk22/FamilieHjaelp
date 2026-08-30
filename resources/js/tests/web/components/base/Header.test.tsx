import { JSX } from 'react'
import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeaderActions from '@/components/WebLayout/Navigation/HeaderActions'
import { test, describe, expect, vi, beforeEach } from 'vitest'

import Header from '@/components/WebLayout/Header'
import Logo from '@/components/WebLayout/Logo'
import MainNav from '@/components/WebLayout/MainNav'

vi.mock('@inertiajs/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@inertiajs/react')>()
  return {
    ...actual,
    usePage: () => ({
      props: {
        auth: {
          user: {
          }
        }
      }
    })
  }
})

vi.mock('@/components/WebLayout/Header', () => ({
  default: () => (
    <header>
      <Logo />
      <MainNav />
      <HeaderActions />
    </header>
  )
}))

describe('Website Header', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('min-width: 1024px') && window.innerWidth >= 1024,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false)
    }))
  })

  test('renders correctly with logo', async () => {
    const { getByAltText } = render(<Header />)
    expect(getByAltText('Familiehjælp Logo')).toBeInTheDocument()
  })

  test('renders rendering desktop navigation if viewport is greater than 1024px wide', async() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1025,
    })

    const component = render(<Header />)
    act(() => {
      window.dispatchEvent(new Event('resize'));
    })

    expect(component.getByTestId('desktop-navigation')).toBeInTheDocument()
  })

  test('renders hiding desktop navigation and showing mobile navigation', async() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1023,
    })

    const component = render(<Header />)
    act(() => {
      window.dispatchEvent(new Event('resize'));
    })

    expect(component.queryByTestId('desktop-navigation')).not.toBeInTheDocument()
    expect(component.getByTestId('mobile-navigation')).toBeInTheDocument()
  })

  test('renders language switcher component', async () => {
    const { getByTestId } = render(<Header />)
    expect(getByTestId('language-switcher')).toBeInTheDocument()
  })
})