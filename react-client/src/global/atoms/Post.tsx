export interface Post {
    id: string,
    title: string,
    content: string
}

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// export type Post = PartialBy<PostInitial, 'id'>

export class Post implements Post {
    constructor(public id:string,public title:string,public content:string) {}
}