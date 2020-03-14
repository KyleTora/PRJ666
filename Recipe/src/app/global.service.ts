import { Injectable, Directive } from '@angular/core';

@Injectable()

export class User{
    logged: boolean;
    id = 0;
    username: string;
    password: string;
    email: string;

    setUser(ID, user, pass, emai) {
        this.id = ID;
        this.username = user;
        this.password = pass;
        this.email = emai;
        this.logged = true;
    }

    getUsername() {
        return this.username;
    }
    getEmail() {
        return this.email;
    }
    getId() {
        return this.id;
    }
    getLogged(){
        return this.logged;
    }
};