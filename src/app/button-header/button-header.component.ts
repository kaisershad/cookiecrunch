import { Component, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-button-header',
  templateUrl: './button-header.component.html',
  styleUrls: ['./button-header.component.css']
})
export class ButtonHeaderComponent {

  animal: string;
  name: string;

  constructor(public dialog: MdDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateArticleDialogComponent, {
      width: '320px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'app-create-article',
  templateUrl: 'create-article.component.html',
})
export class CreateArticleDialogComponent {

  constructor(
    public dialogRef: MdDialogRef<CreateArticleDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
    this.dialogRef.close();
  }

}
