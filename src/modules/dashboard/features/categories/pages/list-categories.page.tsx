import { useCategories } from '../useCategoriesStore'

export function ListCategoriesPage() {
  const { categories } = useCategories()

  return (
    <div>
      {categories.map((category) => (
        <ol>
          <li>{category.id}</li>
          <li>{category.name}</li>
          <li>{category.description}</li>
          <li>{category.createdAt}</li>
        </ol>
      ))}
    </div>
  )
}
