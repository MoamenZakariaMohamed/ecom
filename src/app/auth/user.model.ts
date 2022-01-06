export class User{

    constructor(
      public email:string,
      public password:string,
      private _tokin:string,
      private _tokinExpirationDate:Date  
    ){}
    get token(){
        if(!this._tokinExpirationDate || new Date()>this._tokinExpirationDate){
            return null;
        }
        return this._tokin
    }
}