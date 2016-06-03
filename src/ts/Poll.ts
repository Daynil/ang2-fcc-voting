export interface Poll {
    _id?: string;
    creator?: string;
    question?: string;
    choices?: Choice[];
    voters?: string[];
}

export interface Choice {
    text: string,
    votes: number
}

export interface ServerVoteRes {
    poll: Poll;
    duplicate: boolean;
}