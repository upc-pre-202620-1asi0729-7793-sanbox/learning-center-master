import {inject} from '@angular/core';
import {Routes} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Home} from './../shared/presentation/views/home/home';

const about = () => import('./../shared/presentation/views/about/about').then(m => m.About);
const pageNotFound = () => import('./../shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const learningRoutes = () => import('./academic/academic.routes').then(m => m.academicRoutes);
const translatedTitle = (key: string) => () => inject(TranslateService).get(key);

export const routes: Routes = [
  { path: 'home',     component:      Home,                         title: translatedTitle('title-home')  },
  { path: 'about',    loadComponent:  about,                        title: translatedTitle('title-about')  },
  { path: 'academic', loadChildren:   learningRoutes},
  { path: '',         redirectTo:     '/home', pathMatch: 'full'  },
  { path: '**',       loadComponent:  pageNotFound,                 title: translatedTitle('title-page-not-found')  },
];
