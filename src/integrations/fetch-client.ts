export class FetchClient {
  private instance

  constructor(baseURL: string) {
    this.instance = fetch(baseURL)
  }

  async get<T>() {
    const { data } = await (await this.instance).json()
    return data as T
  }
}
