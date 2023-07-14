export type Car = {
    name: string;
    color: string;
    id?: number;
};

export type Winner = {
    id?: number;
    wins: number;
    time: number;
};

export type Cars = {
    name: string;
    color: string;
    id: number;
};

export type Winners = {
    car: Cars;
    color: string;
    id: number;
};

export interface IState {
    page: number;
    winnersPage: number;
    cars: Array<Cars>;
    carCount: string | null;
    animationId: 0;
    winners: Array<Winners>;
    winCount: string | null;
    currentWinner: {
        id: null;
        wins: 0;
        time: 0;
    };
}
