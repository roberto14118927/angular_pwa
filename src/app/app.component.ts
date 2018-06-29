import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotesService } from '../services/notes.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Roberto Notas';
  panelOpenState = false;
  loggedIn: boolean = false;
  categorias: any = ['trabajo', 'personal']
  nota: any = {}
  notas: any = [];
  usuarioActual: any = {};
  message: any = {};
  constructor(private swUpdate: SwUpdate, private notesService: NotesService,
    public snackBar: MatSnackBar, public authService: AuthService,
    public messagingService: MessagingService) {
    this.notesService.getNotes().valueChanges()
      .subscribe((fbNotas) => {
        this.notas = fbNotas;
        console.log(this.notas);
      });
      this.messagingService.getPermission();
      this.messagingService.receiveMessage();
      this.message = this.messagingService.currentMessage;
  }
  ngOnInit(): void {
    if (!this.loggedIn) {
      console.log('sin login')
    } else {
      console.log('ok')
      if (this.swUpdate.isEnabled) {//verificar
        this.swUpdate.available.subscribe(() => {
          window.location.reload();
        })
      }
    }
  }

  guardarNota() {
    console.log(this.nota);
    if (this.nota.id) {
      this.notesService.updateNote(this.nota)
        .then(() => {
          this.openSnackBar('¡Nota actualizada!');
        });
    } else {
      const id = Date.now();
      this.nota.id = id;
      this.nota.author = this.usuarioActual.uid;
      this.notesService.createNote(this.nota)
        .then(() => {
          this.openSnackBar('¡Nota creada!');
          this.limpiarNota();
        });
    }
  }
  seleccionarNota(nota) {
    this.nota = nota;
  }
  limpiarNota() {
    this.nota = {};
  }
  openSnackBar(msj) {
    this.snackBar.open(msj, null, {
      duration: 2000
    });
  }
  eliminarNota(nota) {
    const rsp = confirm('Confirme la eliminación de ' + nota.titulo);
    if (rsp) {
      this.notesService.deleteNote(nota)
        .then(() => {
          this.limpiarNota();
          this.snackBar.open('Nota eliminada.', null, {
            duration: 2000
          })
        });
    }
  }

  login() {
    this.authService.loginWithFacebook()
      .then(rsp => {
        console.log(rsp);
        this.usuarioActual = rsp.user;
        this.loggedIn = true;
        this.openSnackBar('¡Ha iniciado sesión!');
        this.cargarNotas();
      });
  }

  logout() {
    this.authService.logout();
    this.loggedIn = false;
    this.openSnackBar('¡Ha finalizado sesión!');
  }

  cargarNotas() {
    this.notesService.getNotes().valueChanges()
      .subscribe((fbNotas) => {
        this.limpiarNota();
        this.notas = fbNotas.reverse();
        console.log(fbNotas);
      })
  }
}

//

