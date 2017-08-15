import { FormsModule } from '@angular/forms';
import { RecordsActions } from './../records/records.actions';
import { RecordsService } from './../records/records.service';
import { UsersService } from './users.service';
import { Observable } from 'rxjs/Rx';
import { select } from '@angular-redux/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: Array<any>;
  public roles: Array<any>;
  public login: {};

  @select(['users', 'users'])
  private _users$: Observable<any>;

  @select(['login', 'login'])
  private _login$: Observable<any>;

  constructor(
    private _usersService: UsersService,
    private _recordsService: RecordsService,
    private _actionsRecords: RecordsActions
  ) {
    this._users$.subscribe((users) => { this.users = users; });
    this._login$.subscribe((login) => { this.login = login; });
    this.roles = [{value: 'user'}, {value: 'manager'}, {value: 'admin'}];
  }

  public editable(user) {
    if (this.login['role'] === 'admin' && user.username !== this.login['username']) {
      return true;
    } else {
      return false;
    }
  }

  public selectUser(user: any) {
    this._recordsService.getRecords(user.id).subscribe(
      (res) => {
        console.log(res);
        this._actionsRecords.saveCurrentUserId(user.id);
        this._actionsRecords.saveRecords(res);
      },
      (err) => {
        console.log(err);
      }
     );
  }

  public selectRole(role: String) {
    console.log(role);
    return;
  }

  ngOnInit() {
  }

}
