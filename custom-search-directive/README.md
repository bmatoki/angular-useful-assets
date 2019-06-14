this search directive allow you to filter on your value aren't in mat table.
example you have and object that you ngFor on him , you can add a search line and search and filter the value.

For use Search pipe you need to add to your app module under declarations section:

```
declarations: [ SearchPipe ]
```

and don't forget to import :

```
import { SearchPipe } from '../search.directive';
```

Inside your component:

```
<form>
  <mat-form-field>
    <input matInput placeholder="Search firstnames" [(ngModel)]="queryFirstName">
  </mat-form-field>
</form>

<div *ngFor="let obj of childrens | search:'firstname':queryFirstName ; index as i  ">
  <p>{{obj.firstname}}</p>
  <p> {{obj.lastname}}</p>
</div>

```