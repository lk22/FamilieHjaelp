import {vi} from 'vitest'

export const mockUseForm = (initialData = {}) => ({
  data: {
    data: {
      ...initialData
    },
  },
  setData: vi.fn(),
  post: vi.fn(),
  processing: false,
  errors: {}
})

vi.mock('@inertiajs/react', async () => {
  const actual = await vi.importActual('@inertiajs/react');
  return {
    ...actual,
    useForm: mockUseForm,
    router: {
      post: vi.fn(),
      get: vi.fn(),
      visit: vi.fn(),
    }
  }
});