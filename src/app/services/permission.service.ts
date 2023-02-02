import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  permissions!: string;

  constructor(private authService: AuthenticationService) {}

  hasPermission(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.isConnectedObs().pipe(map(res => {
      this.permissions = this.getPermissions();
      return this.checkPermission(next.data['permission']);
    }));
  }

  getPermissions(): string {
    const role = localStorage.getItem('ROLE');
    // Check if the user object exists.
    if (role) {
        // Parse the user object from the string.
        const parsedRole = role;
        // Extract the user's permissions from the user object.
        return parsedRole;
    } else {
        // Return an empty array if the user object does not exist.
        return '';
    }
  }

  checkPermission(permission: string): boolean {
    // Check if the user's permissions include the required permission.
    return this.permissions.includes(permission);
  }
}
