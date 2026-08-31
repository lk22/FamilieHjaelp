import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '@/components/WebLayout/Footer'
import { test, describe, expect, vi } from 'vitest'

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>()
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
    })
  }
})

vi.mock('@inertiajs/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@inertiajs/react')>()
  return {
    ...actual,
    usePage: () => ({
      props: {
        locale: 'en'
      }
    })
  }
})

describe('Website Footer', () => {
  test('renders correctly', async () => {
    const { getByTestId } = render(<Footer />)
    expect(getByTestId('website-footer')).toBeInTheDocument()
  })
})