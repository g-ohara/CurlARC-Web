export class FetchError {
  public error: string
  public status: number

  constructor(error: string, status: number) {
    this.error = error
    this.status = status
  }
}
