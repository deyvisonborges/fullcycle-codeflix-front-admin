import { FetchClient } from '../fetch-client'
import { CategoryModel } from './category.model'

export class CategoryService extends FetchClient {
  constructor() {
    super('/categories')
  }

  async getCategories() {
    return await this.get<CategoryModel>()
  }

  async removeCategoryById(categoryId: string) {
    return await fetch('' + categoryId, { method: 'DELETE' })
  }
}
