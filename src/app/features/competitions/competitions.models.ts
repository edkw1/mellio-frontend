export interface CompetitionResponse {
    id: number
    name: string
    startDate: string
    endDate: string
    samplesCount: number
    evaluatedSamplesCount: number
    status: CompetitionStatus
}

export enum CompetitionStatus {
    CREATED = 'CREATED',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

export interface Column {
    field: string
    header: string
}
