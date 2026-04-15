import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html'
})
export class UserFormComponent {
  message=''
  isEditMode = false;

  userForm!: FormGroup;
  //Le constructeur = au chargement de la page
  // Il se passe UNE fois.
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute, //pour lire l’URL
    private router: Router         //pour rediriger après l’ajout ou la modification d’un utilisateur
  ) {
    // Initialiser le formulaire 
    // créer le formulaire avec les champs name et email, et ajouter des validateurs
    //  pour s’assurer que les champs sont remplis et que l’email est valide
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    //est-ce qu’il y a un id dans l’URL ?
    // Si oui :
    // on remplit le formulaire
    // sinon → on ne fait rien

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.isEditMode = true;

      const user=this.userService.getUserById(id).subscribe(user=>{
         if(user){
        this.userForm.patchValue({
          name:user.name,
          email:user.email
        });

      }
      });
     

    }

  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.userService.updateUser(id,{
        name:this.userForm.value.name!,
        email:this.userForm.value.email!
      }).subscribe(() => {

      this.message = 'Utilisateur modifié avec succès';

      setTimeout(() => {
        this.router.navigate(['/users']);
      }, 1500);

    });

  }else{

    this.userService.addUser({
      name: this.userForm.value.name!,
      email: this.userForm.value.email!
    }).subscribe(() => {

      this.message = 'Utilisateur ajouté avec succès';

      setTimeout(() => {
        this.router.navigate(['/users']);
      }, 1500);

    });
  }
  }
}
