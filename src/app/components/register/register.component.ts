import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      agreement: new FormControl('', [Validators.required])
    }, { validators: this.passwordsMatch })

  }

  passwordsMatch (control: AbstractControl): ValidationErrors | null {
    const password = control?.get('password')?.value;
    const passwordConfirm = control?.get('confirmPassword')?.value;
    return ((password && passwordConfirm )&& (password === passwordConfirm))? null : { passwordsNotMatching: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid){
      alert('Invalid value form!');
    } else {
      this.authService.register(this.registerForm.value).pipe(
        map(user => this.router.navigate(['login']))
      ).subscribe();
    }
  }
}
