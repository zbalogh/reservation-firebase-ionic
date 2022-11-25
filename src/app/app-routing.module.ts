import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'deskreservation',
    loadChildren: () => import('./pages/deskreservation/deskreservation.module').then( m => m.DeskreservationPageModule)
  },

  {
    path: 'deskreservation-form',
    loadChildren: () => import('./pages/deskreservation-form/deskreservation-form.module').then( m => m.DeskreservationFormPageModule)
  },

  {
    path: 'show-reservation',
    loadChildren: () => import('./pages/show-reservation/show-reservation.module').then( m => m.ShowReservationPageModule)
  },

  {
    path: 'admin/settings',
    loadChildren: () => import('./pages/admin/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard],
  },
  /*
  {
    path: 'admin/settings/:p',
    loadChildren: () => import('./pages/admin/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard],
  },
  */

  {
    path: 'deskreservation-editor',
    loadChildren: () => import('./pages/admin/deskreservation-editor/deskreservation-editor.module').then( m => m.DeskreservationEditorPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'notfound',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },

  // if no path, then we redirect to Home page
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

   // last route entry for case when no matching, then we display 'page not found' component
   {
    path: '**',
    redirectTo: 'notfound',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
