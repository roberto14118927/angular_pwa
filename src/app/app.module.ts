import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatOptionModule, MatSelectModule, MatListModule, MatSnackBarModule, MatCardModule} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { AuthService } from '../services/auth.service';
import { MessagingService } from '../services/messaging.service';


const firebaseConfig:any = {
    apiKey: "AIzaSyBETSPHbiZOqEXhThpK3e6_ydZuikNHEoc",
    authDomain: "robertonotas-705d6.firebaseapp.com",
    databaseURL: "https://robertonotas-705d6.firebaseio.com",
    projectId: "robertonotas-705d6",
    storageBucket: "robertonotas-705d6.appspot.com",
    messagingSenderId: "86352156177"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    
  ],
  providers: [NotesService, AuthService, MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
