export interface BotzApp {
  name: string
  corsEnabled: boolean
}

type ERROR_CODE = "ERROR" | "INVALID_INPUTS"

export type BotzAppVariant = "GOOGLE_OAUTH" | "PUBLIC_API" | "OPEN_API"

interface AppConfigBase {
  name: string
  // TODO: the response return type must be more strictly defined
  genSuccessResponse?: (data?: any) => any
  apiInputs?: string[]
}

interface AppConfigOpenApi extends AppConfigBase {
  variant: "OPEN_API"
}
interface AppConfigPublicAPI extends AppConfigBase {
  variant: "PUBLIC_API"
  // TODO: we may want to pass type parameter for the promised data?
  fetchDataFromPublicApi: (input?: any) => Promise<any>
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
