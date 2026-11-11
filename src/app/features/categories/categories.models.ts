export interface CategoryResponse {
    id: number
    name: string
    description: string
    parameters: ParameterResponse[]
    parametersCount: number
    samplesCount: number
    evaluatedSamplesCount: number
}

export interface ParameterResponse {
    id: number
    name: string
    description: string
    minRate: number
    maxRate: number
    rateStep: number
    coefficient: number
}
