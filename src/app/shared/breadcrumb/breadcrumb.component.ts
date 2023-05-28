import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

export interface BreadcrumbItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit{

  activeRoutes: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit(): void {
    let route = this.activatedRoute.snapshot;
    if (route) {
      while (route) {
        if (route.routeConfig && route.routeConfig.data) {
          this.activeRoutes.push({
            label: route.routeConfig.data['breadcrumb'],
            path: route.url.map(segment => segment.path).join('/'),
            isActive: false
          });
        }
        if (!route.firstChild) {
          // Marcamos o penúltimo item como ativo
          if (this.activeRoutes.length > 1) {
            this.activeRoutes[this.activeRoutes.length - 2].isActive = true;
          }
          break;
        }
        route = route.firstChild;
      }
    }
  }


}
