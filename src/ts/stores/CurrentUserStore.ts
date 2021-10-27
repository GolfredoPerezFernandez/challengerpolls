/**
* CurrentUserStore.tsx
* Copyright: Microsoft 2018
*
* Singleton store that maintains information about the currently-signed-in user.
*/

import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import { User } from '../models/IdentityModels';

@AutoSubscribeStore
export class CurrentUserStore extends StoreBase {
    // TODO - properly initialize
    private _user: User = {
        id: '',
        address:'',
        transactionEth:0,
        transactionBSC:0,
        transactionMatic:0,
        fullName: '',
    };
    private _isLogin: boolean = false

    private activeId: string = 'all'
    @autoSubscribe
    getActive() {

        return this.activeId
    }

    setActive(password: string) {
        this.activeId = password
        this.trigger()
    }
    private _voted: boolean = false
    @autoSubscribe
    getVoted(): boolean {
        return this._voted;
    }
    setVoted(logIn: boolean) {
        this._voted=logIn
        this.trigger();
    }
    private _error: boolean = false
    @autoSubscribe
    getLogin(): boolean {
        return this._isLogin;
    }
    setLogin(logIn: boolean) {
        this._isLogin=logIn
        this.trigger();
    }
    setUser(id:string,fullName:string,address:string,transactionEth?:number,transactionBSC?:number,transactionMatic?:number) {
        this._user={            
        id,
        address,
        transactionEth,
        transactionBSC,
        transactionMatic,
        fullName
        }
        this.trigger();
    }
    private _cargando=false
    setCargando(count:boolean) {
        this._cargando=count
        this.trigger();
    }
    private _getMaticTransaction=0
    @autoSubscribe
    getCargando(): boolean {
        return this._cargando;
    }
    setError(logIn:boolean) {
        this._error=logIn
        this.trigger();
    }
    
    setMaticTransaction(count:number) {
        this._getMaticTransaction=count
        this.trigger();
    }
    @autoSubscribe
    getMaticTransaction(): number {
        return this._getMaticTransaction;
    }
    setBscTransaction(count:number) {
        this._getBscTransaction=count
        this.trigger();
    }
    private _getBscTransaction=0
    @autoSubscribe
    getBscTransaction(): number {
        return this._getBscTransaction;
    }
    setEThTransaction(count:number) {
        this._getEThTransaction=count
        this.trigger();
    }
    private _getEThTransaction=0
    @autoSubscribe
    getEThTransaction(): number {
        return this._getEThTransaction;
    }
    @autoSubscribe
    getError(): boolean {
        return this._error;
    }
    @autoSubscribe
    getUser(): User | undefined {
        return this._user;
    }

    @autoSubscribe
    getFullName(): string {
        return this._user ? this._user.fullName : '';
    }
}

export default new CurrentUserStore();
