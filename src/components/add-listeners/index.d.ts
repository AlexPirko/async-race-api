import Track from '../../view/track';
export default class AddListeners {
    private racing;
    private winnersPage;
    private creatingProcess;
    track: Track;
    constructor();
    init(): void;
    selectPage(): void;
    addRaceListeners(): void;
    addTrackListeners(): void;
    addCreateCarListener(): void;
    addUpdateCarListener(): void;
    addGenerateCarsListener(): void;
    addGaragePaginationListener(): Promise<void>;
    addWinnersPaginationListener(): Promise<void>;
    sortByTimeListener(): Promise<void>;
    addTableSortListener(): Promise<void>;
}
