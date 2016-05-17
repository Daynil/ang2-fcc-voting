export interface User {
	githubID: string;
    displayName: string;
    username: string;
}

export interface Credentials {
    loggedIn: boolean;
    user: User;
}