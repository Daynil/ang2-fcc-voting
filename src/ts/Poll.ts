export interface Poll {
    creator?: string;
    question?: string;
    choices?: Choice[];
}

interface Choice {
    text: string,
    votes: number
}