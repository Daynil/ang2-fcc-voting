export interface Poll {
    creator?: string;
    question?: string;
    choices?: Choice[];
}

export interface Choice {
    text: string,
    votes: number
}