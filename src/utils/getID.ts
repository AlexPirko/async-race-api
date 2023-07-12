export default function getID(el: HTMLElement): number {
    const raceBlock: HTMLElement | null = el.closest('.race-block');
    if (raceBlock) {
        return Number(raceBlock.dataset.id);
    }
    return 0;
}
