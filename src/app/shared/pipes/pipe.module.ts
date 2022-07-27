import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { FilterPipe } from './filter.pipe';
import { SearchPipe } from './search.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { ShortUnamePipe } from './short-uname.pipe';

@NgModule({
  declarations:[FilterPipe, SearchPipe, ShortNamePipe,ShortUnamePipe],
  imports:[CommonModule],
  exports:[FilterPipe, SearchPipe, ShortNamePipe,ShortUnamePipe]
})

export class PipeModule{}
