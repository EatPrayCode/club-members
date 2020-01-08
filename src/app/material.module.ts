import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatDialog,
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTooltipModule
} from "@angular/material";
import { DialogService } from './core/services/dialog.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [
    MatDialog
  ],
  entryComponents: []
})
export class MaterialModule {}
