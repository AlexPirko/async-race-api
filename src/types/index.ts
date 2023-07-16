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
    time: number;
    wins: number;
    id: number;
    car: Cars;
};

export interface IState {
    page: number;
    winnersPage: number;
    cars: Array<Cars>;
    carCount: string | null;
    animationId: number;
    winners: Array<Winners>;
    winCount: string | null;
    currentWinner: {
        id: number | undefined;
        wins: number;
        time: number;
    };
}
