import { DataPerEnd } from "./model";

export type registerUserRequest = {
  name: string
  email: string
  id_token: string
}

export type signInRequest = {
  email: string
  password: string
}

export type createRecordRequest = {
  place: string
  date: Date
  ends_data: DataPerEnd[]
}
