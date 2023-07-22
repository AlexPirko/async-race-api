export function addPrevPagination(prev: HTMLButtonElement, next: HTMLButtonElement, page: number): number {
    const prevPage = page - 1;

    if (prevPage === 1) {
        prev.disabled = true;
        next.disabled = false;
    }

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

    if (nextPage === Math.ceil(count / carLimit)) {
        prev.disabled = false;
        next.disabled = true;
    }

    return nextPage <= Math.ceil(count / carLimit) ? nextPage : page;
}
