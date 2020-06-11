export interface ID {
    id: string
}

export interface Status {
    status: String
    id: String
}

export interface PostInitial {
    id: string,
    title: String,
    content: String
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Post = PartialBy<PostInitial, 'id'>

