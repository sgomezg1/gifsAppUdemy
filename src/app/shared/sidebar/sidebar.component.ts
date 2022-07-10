import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private gfServ: GifsService
  ) { }
  get historial() {
    return this.gfServ.historial
  }
  buscarGifsSidebar(termino: string) {
    this.gfServ.buscarGifs(termino)
  }

}
