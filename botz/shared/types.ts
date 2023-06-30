export interface BotzApp {
  name: string
  corsEnabled: boolean
}

type ERROR_CODE = "ERROR" | "INVALID_INPUTS"

export type BotzAppVariant = "GOOGLE_OAUTH" | "PUBLIC_API" | "OPEN_API"

interface AppConfigBase {
  name: string
  genJsonResponseFromApiData?: (data: any) => any
  apiInputs?: string[]
}

interface AppConfigOpenApi extends AppConfigBase {
  variant: "OPEN_API"
}
interface AppConfigPublicAPI extends AppConfigBase {
  variant: "PUBLIC_API"
  apiKey: string
  apiEndpoint: string
}

interface AppConfigGoogle extends AppConfigBase {
  variant: "GOOGLE_OAUTH"
  authFilepath: string
}

export type AppConfig = AppConfigOpenApi | AppConfigPublicAPI | AppConfigGoogle

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
