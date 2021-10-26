import { makeObservable, observable } from 'mobx';

export class CompanyEntity {
    public id: number;
    public name: string;
    public phone: number;
    public address: string;

    constructor() {
        makeObservable(this, {
            id: observable,
            name: observable,
            phone: observable,
            address: observable,
        });
    }
}
