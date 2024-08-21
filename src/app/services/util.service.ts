import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class UtilService {
    
    constructor(){}
    
    onlyNumbers(event: KeyboardEvent){
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
        }
    
}

