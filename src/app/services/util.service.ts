import { Injectable } from "@angular/core";
import { retry } from "rxjs";

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

    onlyText(event: KeyboardEvent) {
        const charCode = event.which ? event.which : event.keyCode;
        // Permitir letras mayúsculas (65-90), letras minúsculas (97-122), espacios (32), y acentos (á: 225, é: 233, í: 237, ó: 243, ú: 250, ü: 252, ñ: 241)
            if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 32 &&
            charCode !== 225 && charCode !== 233 && charCode !== 237 && charCode !== 243 && charCode !== 250 &&
            charCode !== 252 && charCode !== 241 && charCode !== 8) {
                // event.preventDefault();
                return false;
            }
            return true;
      }
     
    
}

