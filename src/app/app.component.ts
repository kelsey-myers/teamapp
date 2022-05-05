import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // state of application
  // title = 'teamapp';
  newMemberName = '';
  numberOfTeams: number | '' = '';
  members: string[] = [];
  error = '';
  teams: string[][] = [];

  clearFields = () => {
    this.newMemberName = '';
    this.error = '';
  };

  addMember = () => {
    if (!this.newMemberName) {
      this.error = 'Name cannot be empty.';
      return;
    }
    this.members.push(this.newMemberName);
    this.clearFields();
  };

  onInput = (member: string) => {
    this.newMemberName = member;
  };

  onTeamsInput = (number: string) => {
    const newNumber = Number(number);
    this.numberOfTeams = newNumber;
  };

  createRandomTeams = () => {
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.error = 'Invalid number of teams.';
      return;
    } else if (this.members.length < this.numberOfTeams) {
      this.error = 'Not enough members.';
      return;
    }

    this.error = '';
    const allMembers = [...this.members];

    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const memberToAdd = allMembers.splice(randomIndex, 1)[0];

        if (!memberToAdd) break;

        if (this.teams[i]) {
          this.teams[i].push(memberToAdd);
        } else {
          this.teams[i] = [memberToAdd];
        }
      }
    }

    this.members = [];
    this.numberOfTeams = '';
  };
}
