import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {
  displayedColumns = ['articleId', 'articleName', 'description', 'supplier', 'price', 'category', 'color', 'select'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  @ViewChild(MdSort) sort: MdSort;

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort);
  }
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Casual Hose', 'T-Shirt V-Neck', 'Laufschuhe', 'Schnürrer', 'Sneaker',
  '501 Jeans', 'Tailored Shirt', 'Winterjacke', 'Stoffhose', 'Pullover sportiv', 'Jogginghose',
  'Lederjacke', 'Mütze', 'Schal', 'Handschuhe', 'Ledergürtel', 'Stoffgürtel', 'Socken'];

export interface ArticleData {
  id: string;
  name: string;
  description: string;
  supplier: string;
  price: string;
  category: string;
  color: string;
  select: any;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<ArticleData[]> = new BehaviorSubject<ArticleData[]>([]);
  get data(): ArticleData[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 100 Articles.
    for (let i = 0; i < 100; i++) { this.addArticle(); }
  }

  /** Adds a new Article to the database. */
  addArticle() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewArticle());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new Article. */
  private createNewArticle() {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ';
    const description = 'Alles super beqeum';
    const supplier = 'Nike';
    const category = 'Kleidung';
    const select = '';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      description: description,
      supplier: supplier,
      price: Math.round(Math.random() * 100).toString(),
      category: category,
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
      select: select
    };
  }
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase, private _sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ArticleData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.mdSortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): ArticleData[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'articleId': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'articleName': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'description': [propertyA, propertyB] = [a.description, b.description]; break;
        case 'supplier': [propertyA, propertyB] = [a.supplier, b.supplier]; break;
        case 'price': [propertyA, propertyB] = [a.price, b.price]; break;
        case 'category': [propertyA, propertyB] = [a.category, b.category]; break;
        case 'color': [propertyA, propertyB] = [a.color, b.color]; break;
      }

      const valueA: any = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB: any = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
