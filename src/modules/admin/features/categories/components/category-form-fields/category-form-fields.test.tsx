import { fireEvent } from '@testing-library/react'
import {
  CategoryFormFields,
  CategoryFormFieldsDataProps
} from './category-form-fields'
import { renderWithProviders } from '@/utils/test/renderWithProviders'

const mockProps = {
  isDisabled: true,
  handleChange: jest.fn(),
  handleToggle: jest.fn()
}

describe('CategoryFormFields', () => {
  let data = {} as CategoryFormFieldsDataProps

  // reseta os dados antes de cada teste
  beforeEach(() => {
    data = {
      name: 'mock name',
      description: 'some mock description',
      isActive: true
    }
  })

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

  // it('should render passed valus by props', () => {
  //   const {} = renderWithProviders(
  //     <CategoryFormFields data={data} {...mockProps} />
  //   )
  // })

  it('should execute handle change when inputs change', () => {
    const mockHandleChange = jest.fn((e) => {
      const { name, value } = e.target
      data = { ...data, [name]: value }
    })
    const mockHandleToggle = jest.fn()

    const { getByLabelText } = renderWithProviders(
      <CategoryFormFields
        data={data}
        handleChange={mockHandleChange}
        handleToggle={mockHandleToggle}
      />
    )

    const nameInput = getByLabelText(/Nome/i)
    const descriptionInput = getByLabelText(/Descrição/i)

    fireEvent.change(nameInput, { target: { value: 'New category name' } })
    fireEvent.change(descriptionInput, {
      target: { value: 'New description' }
    })

    expect(mockHandleChange).toHaveBeenCalledTimes(2)

    expect(data).toEqual({
      name: 'New category name',
      description: 'New description',
      isActive: true
    })
  })

  it('should update input values when handleChange is called', () => {
    let mockData = {
      name: 'mock name',
      description: 'some mock description',
      isActive: false
    }

    const mockHandleChange = jest.fn((e) => {
      const { name, value } = e.target
      mockData = { ...mockData, [name]: value }
    })

    const { getByLabelText, rerender } = renderWithProviders(
      <CategoryFormFields
        data={mockData}
        handleChange={mockHandleChange}
        handleToggle={jest.fn()}
        isDisabled={false}
      />
    )

    const nameInput = getByLabelText(/Nome/i)
    fireEvent.change(nameInput, {
      target: { value: 'Updated name', name: 'name' }
    })

    rerender(
      <CategoryFormFields
        data={mockData}
        handleChange={mockHandleChange}
        handleToggle={jest.fn()}
        isDisabled={false}
      />
    )

    expect(nameInput).toHaveValue('Updated name')
  })

  it('should toggle checkbox to active', () => {
    // quando eu renderizar a pagina
    const { getByLabelText } = renderWithProviders(
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
    // quero buscar o componente de checkbox através do texto atribuido a ele
    const checkbox = getByLabelText(/Ativo/i)
    // clico nele
    fireEvent.click(checkbox)
    // e espero que ele tenha sido clicado
    expect(checkbox).toBeChecked()
  })
})
