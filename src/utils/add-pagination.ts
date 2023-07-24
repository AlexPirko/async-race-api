import { initState } from './add-initial-states';

export function addPrevPagination(prev: HTMLButtonElement, next: HTMLButtonElement, page: number): number {
    const prevPage = page - 1;

    if (prevPage === 1) {
        prev.disabled = true;
    }

    next.disabled = false;
    return prevPage >= 1 ? prevPage : page;
}

export function addNextPagination(
    prev: HTMLButtonElement,
    next: HTMLButtonElement,
    page: number,
    count: number
): number {
    const nextPage = page + 1;
    const carLimit = 7;
    const tableLimit = 10;

    if (nextPage > 1) {
        prev.disabled = false;
    }

    if (initState.isWinners) {
        if (nextPage === Math.ceil(count / tableLimit)) {
            next.disabled = true;
        }
        console.log(Math.ceil(count / (tableLimit * page)));

        return nextPage <= Math.ceil(count / tableLimit) ? nextPage : page;
    }

    if (initState.isGarage) {
        if (nextPage === Math.ceil(count / carLimit)) {
            next.disabled = true;
        }

        return nextPage <= Math.ceil(count / carLimit) ? nextPage : page;
    }
    return nextPage;
}
