import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  note: Note = new Note();
  noteId!: number;
  new: boolean = false;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // We want to find out if we are creating a new note or editing an existing one
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.noteId = +params['id']; // Convert to number
        this.note = this.notesService.get(this.noteId);
        this.new = false;
      } else {
        this.new = true;
      }
    });
  }

  onSubmit(form: NgForm) {
    
    if (this.new) {
      // We should save the note
      const newNoteId = this.notesService.add(form.value);
      this.router.navigateByUrl('/');
    } else {
      // We should update the note
      this.notesService.update(this.noteId, form.value.title, form.value.body);
      this.router.navigateByUrl('/');
    }
  }

  cancel() {
    this.router.navigateByUrl('/');
  }
}
