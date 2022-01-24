export interface Review {
    id: number,
    product: 1,
    created_by: {
        id: number,
        username: string
    },
    rate: 0,
    text: string,
    created_at: string
}