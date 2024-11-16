import { CategoryFormFields } from './category-form-fields'
import { renderWithProviders } from '@/utils/test/renderWithProviders'

const mockProps = {
  isDisabled: true,
  handleChange: jest.fn(),
  handleToggle: jest.fn()
}

describe('CategoryFormFields', () => {
  it('should render category form fields correctly', () => {
    const { asFragment } = renderWithProviders(
      <CategoryFormFields
        data={{
          name: 'mock name',
          description: 'some mock description',
          isActive: true
        }}
        {...mockProps}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render category from with disabled state', () => {
    const { asFragment } = renderWithProviders(
      <CategoryFormFields
        data={{
          name: 'mock name',
          description: 'some mock description',
          isActive: true
        }}
        {...mockProps}
        isDisabled
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
