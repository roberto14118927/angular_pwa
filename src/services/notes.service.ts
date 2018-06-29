import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";

@Injectable()
export class NotesService {
    constructor(public afDB: AngularFireDatabase) {

    }
    public getNotes() {
        return this.afDB.list('/notes/');
    }
    public getNote(id) {
        return this.afDB.object('/notes/' + id);
    }
    public createNote(note) {
        return this.afDB.database.ref('/notes/' + note.id).set(note);
    }
    public editNote(note) {
        return this.afDB.database.ref('/notes/' + note.id).set(note);
    }
    public deleteNote(note) {
        //Reto para hacer
        return this.afDB.database.ref('/notes/' + note.id).remove();
    }
    public updateNote(note){
        // por organizacion y logica
        return this.afDB.database.ref('/notes/'+note.id).set(note);
     }
}