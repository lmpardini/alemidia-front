import { Router, NavigationEnd, ActivatedRoute, ActivationEnd, ActivationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { map, Subscription } from "rxjs";
import { an } from "@fullcalendar/core/internal-common";


export interface BreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit {

  breadcrumbItems: BreadcrumbItem[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbItems = this.buildBreadcrumb(this.activatedRoute.root);
      });
  }

  buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbItems: BreadcrumbItem[] = []): BreadcrumbItem[] {
    const routeData = route.snapshot.data;

   console.log(`${url}/${route.snapshot.url.join('/')}`)

    // if (routeData && routeData['label']) {
    //   const breadcrumbItem: BreadcrumbItem = {
    //     label: routeData['label'],
    //     url: `/${url}`,
    //   };
    //   breadcrumbItems.push(breadcrumbItem);
    // }

    if (routeData && routeData['breadcrumb']) {
      const breadcrumbItem: BreadcrumbItem = {
        label: routeData['breadcrumb'],
        url: `/${url}`,
      };
      breadcrumbItems.push(breadcrumbItem);
    }

    if (route.firstChild) {
      return this.buildBreadcrumb(route.firstChild, `${url}${route.snapshot.url.join('/')}`, breadcrumbItems);
    }

    return breadcrumbItems;
  }

  // public titulo?: string;
  // public  tituloSubs$: Subscription
  //
  //
  // public teste:any = []
  //
  // constructor(private router: Router,
  //             private activatedRoute: ActivatedRoute) {
  //   this.tituloSubs$ = this.getArguments().subscribe(({titulo}) => {
  //
  //     this.teste.push(titulo)
  //     this.teste.reverse();
  //
  //
  //   });
  // }
  //
  //
  // ngOnInit() {
  //   console.log(this.activatedRoute.snapshot.data)
  //
  // }
  //
  // ngOnDestroy(): void {
  //   this.tituloSubs$.unsubscribe();
  //   console.log('teste')
  //
  // }
  //
  // getArguments() {
  //   return this.router.events.pipe(
  //     filter((event:any) => event instanceof ActivationEnd),
  //
  //     map((event:ActivationEnd) => event.snapshot.data)
  //   )
  // }
  //
  // getPai() {
  //   return this.router.events.pipe(
  //     filter((event:any) => event instanceof ActivationStart),
  //     filter((event:ActivationStart) => event.snapshot.data != null),
  //     map((event:ActivationStart) => event.snapshot.data)
  //   )
  // }

  // getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
  //   const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  //
  //   const { snapshot } = route;
  //
  //   if (snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
  //     const label = snapshot.data[ROUTE_DATA_BREADCRUMB];
  //     breadcrumbs.push({ label, url });
  //   }
  //
  //   const parent = route.parent;
  //   if (parent) {
  //     const routeURL: string = parent.snapshot.url.map(segment => segment.toString()).join('/');
  //     const newUrl = `${routeURL}/${url}`;
  //     return this.getBreadcrumbs(parent, newUrl, breadcrumbs);
  //   }
  //
  //   return breadcrumbs.reverse();
  // }
}
