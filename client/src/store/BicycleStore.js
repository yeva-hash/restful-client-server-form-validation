import {makeAutoObservable} from 'mobx';

export default class BicycleStore {
    constructor() {
        this._bicycles = [];
        this._stats = [];
        makeAutoObservable(this)
    }

    setBicycles(bicycle) {
        this._bicycles = bicycle;
    }

    setStats(stats) {
        this._stats = stats;
    }

    get bicycles() {
        return this._bicycles;
    }

    get stats() {
        return this._stats;
    }
}