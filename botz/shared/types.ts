export interface AppConfig {
  name: string
}
export interface BotzApp {
  name: string
  corsEnabled: boolean
}

type ERROR_CODE = "API_KEY_MISSING"

export interface AppConfig {
  name: string
  apiKey?: string
  genJsonResponseFromApiData?: (data: any) => any
  apiEndpoint?: string
  apiInputs?: string[]
  corsEnabled?: boolean
}


interface ApiRespSuccess<D> {
    data: D;
    errorCode?: never;
}
interface ApiRespError {
    data?: never;
    errorCode: ERROR_CODE;
}

export type ApiResp<D> = ApiRespSuccess<D> | ApiRespError;

export interface BotzApp {
  start: (port: number) => void
}
