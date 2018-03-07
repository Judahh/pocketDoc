import { Permission } from './permission';

export class Authentication {

    username: string;
    password: string;
    permission: Permission;

    constructor(username: string,
        password: string,
        permission?: Permission) {
        this.username = username;
        this.password = password;
        if (permission) {
            this.permission = permission;
        } else {
            this.permission = Permission.User;
        }
    }
}