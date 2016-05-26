export interface Poll {
    _id?: string;
    creator?: string;
    question?: string;
    choices?: Choice[];
}

export interface Choice {
    text: string,
    votes: number
}