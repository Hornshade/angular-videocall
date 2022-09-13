import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';
import { VideocallComponent } from './videocall/videocall.component';

const routes: Routes = [
  {
    path: 'videocall',
    component: VideocallComponent,
    title: 'Video conference',
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  { path: '**', component: InvalidPageComponent, title: 'Invalid page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
