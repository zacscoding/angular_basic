import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuard implements CanActivate {
    private checkIfLoggedIn() : boolean {
        // 임의로 로그인 여부를 판단
        let loggedIn : boolean = Math.random() < 0.5;

        if(!loggedIn) {
            console.log("LoginGuard : The user is not logged in and can't navigate to product details");
        }

        return loggedIn;
    }

    canActivate(destination : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
        console.log(destination);
        console.log(state);
        // ProductDetailComponent 출력
        console.log(destination.component.name);
        return this.checkIfLoggedIn();
    }
}