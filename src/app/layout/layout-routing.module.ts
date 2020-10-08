import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'admin',
                loadChildren: () => import('../layout/admin/admin.module').then(x => x.AdminModule)
            },
            {
                path: 'user',
                loadChildren: () => import('../layout/user/user.module').then(x => x.UserModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
