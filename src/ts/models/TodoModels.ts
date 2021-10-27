/**
* TodoModels.tsx
* Copyright: Microsoft 2018
*
* Data models used with Todo sample app.
*/

export interface Todo {
    pollId: string;
    createdAt: number;
    title: string;
    winner: string;
    voted:boolean;
    openPoll:boolean;
    duration: number,
    totalVotes: number;
    time:number;
    options:Option[];
    ownerAddress:string;
    _searchTerms: string;
    owners:string[]
}

export interface Option {
    id: string;
    creationTime: number;
    title: string;
    url: string;
    votes: number;
    votesPercent: string;
    _searchTerms: string;
}