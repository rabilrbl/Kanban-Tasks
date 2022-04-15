
export interface BoardType {
    id: number;
    title: string;
    description?: string;
    created_at: string;
}

export interface BoardList {
    count: number;
    next?: string;
    previous?: string;
    results: BoardType[];
}