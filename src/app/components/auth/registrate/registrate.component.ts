import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.uppercaseValidator,
          ],
        ],

        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }
  uppercaseValidator(control: AbstractControl): ValidationErrors | null {
    const hasUppercase = /[A-Z]/.test(control.value);
    return hasUppercase ? null : { noUppercase: true };
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.registerForm.invalid) return;

    const email = this.registerForm.value.email;

    // Check if email already exists
    this.authService.getUsers().subscribe((users) => {
      const emailExists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (emailExists) {
        this.error = 'Email is already registered';
        return;
      }

      const user: User = {
        name: this.registerForm.value.name,
        email: email,
        password: this.registerForm.value.password,
        favoriteRecipes: [],
      };

      // Register new user
      this.authService.register(user).subscribe({
        next: () => {
          this.success = 'Registration successful!';
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = 'Registration failed';
          console.error(err);
        },
      });
    });
  }
}
