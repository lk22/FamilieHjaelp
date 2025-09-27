import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock Inertia.js
vi.mock('@inertiajs/react', () => ({
  Head: ({ children, title }: { children?: React.ReactNode; title?: string }) =>
    React.createElement(
      'head',
      null,
      title ? React.createElement('title', null, title) : null,
      children
    ),
  Link: ({ children, href, ...props }: any) =>
    React.createElement('a', { href, ...props }, children),
  usePage: () => ({
    props: {
      auth: {
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          todos: [],
          pages: [],
        },
      },
    },
  }),
  router: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    reload: vi.fn(),
    visit: vi.fn(),
  },
}))

// Mock Laravel route helper
global.route = vi.fn((name: string, params?: any) => {
  const routes: Record<string, string> = {
    'profile.home': '/profile',
    'profile.todos': '/profile/todos',
    'profile.info.page': `/profile/info/${params}`,
    'getting-started': '/getting-started',
  }
  return routes[name] || `/${name}`
})

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
})