import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { CountryService } from './country.service';
import { SummaryService } from 'app/shared/services/summary.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss', '../../../assets/sass/libs/datatables.scss'],
  providers: [DecimalPipe, SummaryService, AuthService],
  encapsulation: ViewEncapsulation.None
})
export class TablesComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  public columns = [
    { name: 'User', prop: 'user' },
    { name: 'Page', prop: 'page' },
    { name: 'Total', prop: 'total' },
    { name: 'Time', prop: 'time' },
  ];
  public ColumnMode = ColumnMode;
  private tempData = [];
  analytics: any = [];
  total = 0;
  hasAccess = false;


  constructor(private summaryService: SummaryService, private authService: AuthService, private pipe: DecimalPipe) {
    this.analytics = this.summaryService.analytics.reverse();
    this.tempData = this.analytics;
    this.total = this.analytics.length;
    this.hasAccess = this.authService.isAdmin;
  }

  ngOnInit() {

  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.user.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.analytics = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
