import { Component } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { cleanProfile, updateProfile } from "./store/actions/profile.actions";
import { addItems, removeItems } from "./store/actions/items.actions";
import { addUser, editUser, removeUser } from "./store/actions/user.actions";
import { Observable } from "rxjs";
import { User } from "./model/user.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'dab-root',
  template: `
    <h1>Hello {{ username$ | async }}!</h1>
    <button (click)="updateProfile('Romina D. Zoccali')">Update profile</button>
    <button (click)="cleanProfile()">Clean profile</button>

    <hr>
    <div *ngFor="let item of items$ | async">
      {{ item }}
    </div>
    <button (click)="add('PhateOS')">ADD OS</button>
    <button (click)="remove('PhateOS')">REMOVE OS</button>

    <hr/><br/><br/><br/><br/>
    <form #f="ngForm" (ngSubmit)="saveUser(f)">
      <input #name type="text" placeholder="Name" name="name" [ngModel]="activeUser?.name">
      <input #age type="number" placeholder="age" name="age" [ngModel]="activeUser?.age">
      <button type="submit">Save</button>
    </form>
    <br/>
    <div *ngFor="let user of (users$ | async)" (click)="setActive(user)"
         [style.color]="user.id === activeUser?.id ? 'green' : undefined"
         [style.font-weight]="user.id === activeUser?.id ? 'bold' : undefined">
      {{ user.name }} - {{ user.age }}
      <button (click)="deleteUser(user.id)">Delete</button>
    </div>
  `,
  styles: []
})
export class AppComponent {

  public username$ = this.store.pipe(select('username'))
  public users$: Observable<User[]> = this.store.pipe(select('users'))
  public items$ = this.store.pipe(select('items'))
  public activeUser: User;

  constructor(private readonly store: Store<any>) {
  }

  cleanProfile() {
    this.store.dispatch(cleanProfile())
  }

  updateProfile(profileName: string) {
    this.store.dispatch(updateProfile({value: profileName}))
  }

  add(os: string) {
    this.store.dispatch(addItems({value: os}))
  }

  remove(os: string) {
    this.store.dispatch(removeItems({value: os}))
  }

  deleteUser(id: number) {
    this.store.dispatch(removeUser({id}))
    this.setActive(null)
  }

  saveUser(f: NgForm) {
    console.log(this.activeUser)
    if (this.activeUser?.id) {
      this.store.dispatch(editUser({user: {...f.value, id: this.activeUser.id}}))
    } else {
      const newUser = f.value as User;
      this.store.dispatch(addUser({user: newUser}))
    }

    f.reset()
  }

  setActive(user: User) {
    this.activeUser = user;
  }
}
