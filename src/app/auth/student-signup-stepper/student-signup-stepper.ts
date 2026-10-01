import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidekickService } from '../../core/services/sidekick.service';
import { FriendlyAlert } from '../../shared/components/friendly-alert/friendly-alert';
import { AgeGroup, ROLE_HOME_PATH } from '../../core/models/user.model';

const STEP_LABELS = ["Child's Info", 'Parent & Login', 'Program Interest', 'Tell Us More', 'Terms & Submit'] as const;

/** 10 digits starting with 0 (e.g. 0244090168), or the same number with
 *  the 233 country code in place of the leading 0 (12 digits) — no '+',
 *  no spaces. Mirrors the backend's isValidGhanaPhone exactly. */
const GHANA_PHONE_REGEX = /^(0\d{9}|233\d{9})$/;

function ghanaPhoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value ?? '').trim();
  if (!value) return null; // required validator reports emptiness separately
  return GHANA_PHONE_REGEX.test(value) ? null : { ghanaPhone: true };
}

/** Angular's built-in Validators.email doesn't require a dot in the domain
 *  (e.g. "a@gmai" passes it) — this mirrors the backend's stricter
 *  isValidEmail regex instead, so both sides agree on what's valid. */
const STRICT_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value ?? '').trim();
  if (!value) return null;
  return STRICT_EMAIL_REGEX.test(value) ? null : { email: true };
}

const HEAR_ABOUT_OPTIONS: { id: string; label: string }[] = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'family-friend', label: 'Family/Friend' },
  { id: 'other', label: 'Other' },
];

const ENROL_PROGRAMS: { id: string; label: string; description: string }[] = [
  { id: 'soft-skills', label: 'Soft Skills', description: 'Confidence, public speaking, empathy, integrity, etc.' },
  { id: 'tech-skills', label: 'Tech Skills', description: 'Coding & AI' },
  { id: 'language-skills', label: 'Language Skills', description: 'French' },
  { id: 'personal-coaching', label: 'Personal Coaching', description: '' },
];

/** 3–9 → beginner, 10–17 → advanced — matches the ranges in AGE_GROUPS. */
function deriveAgeGroup(age: number): AgeGroup {
  return age <= 9 ? 'beginner' : 'advanced';
}

/** Age in whole years as of today, accounting for whether this year's
 *  birthday has happened yet — null for an unparseable/future date. */
function calculateAge(dateOfBirth: string): number | null {
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;

  return age >= 0 ? age : null;
}

/** The real child-registration form (child info, parent/guardian contact,
 *  program interest, needs assessment, terms) — a self-contained wizard
 *  that owns its own submit/navigate, same as other smart-form components
 *  in this app (ModuleEditor, CoachAssignments, etc). Only rendered by
 *  Signup when the beginner/advanced tab is selected. */
@Component({
  selector: 'app-student-signup-stepper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FriendlyAlert],
  templateUrl: './student-signup-stepper.html',
  styleUrl: './student-signup-stepper.scss',
})
export class StudentSignupStepper {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private sidekick = inject(SidekickService);

  /** Which tile (Beginner/Advanced) the student clicked on the account-type
   *  picker, one level up in Signup — compared against the age-derived
   *  group so a contradiction (e.g. clicked Beginner, entered age 14) is
   *  flagged instead of silently overridden. */
  readonly selectedAccountType = input<'beginner' | 'advanced'>('beginner');
  /** Emitted when the student accepts the age-derived tier instead —
   *  Signup re-selects that tile (see chooseAccountType), keeping this
   *  component instance (and everything already filled in) intact. */
  readonly accountTypeChange = output<'beginner' | 'advanced'>();

  readonly stepLabels = STEP_LABELS;
  readonly hearAboutOptions = HEAR_ABOUT_OPTIONS;
  readonly enrolPrograms = ENROL_PROGRAMS;

  readonly currentStep = signal(0);
  readonly submitting = signal(false);
  readonly errorMessage = signal('');
  readonly showPassword = signal(false);
  readonly selectedHearAbout = signal<Set<string>>(new Set());

  readonly form = this.fb.nonNullable.group({
    // Step 0 — Child's Information
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    middleName: [''],
    surname: ['', [Validators.required, Validators.minLength(2)]],
    preferredName: [''],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    age: [null as number | null, [Validators.required, Validators.min(3), Validators.max(17)]],
    school: ['', Validators.required],
    gradeClass: ['', Validators.required],
    country: ['', Validators.required],
    // Step 1 — Parent/Guardian & Login
    parentGuardianName: ['', Validators.required],
    parentPhone: ['', [Validators.required, ghanaPhoneValidator]],
    parentWhatsapp: ['', [Validators.required, ghanaPhoneValidator]],
    email: ['', [Validators.required, strictEmailValidator]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    // Step 2 — Program Interest
    enrolProgram: ['', Validators.required],
    howDidYouHearOther: [''],
    // Step 3 — Tell Us More
    growthAreas: ['', Validators.required],
    desiredSkills: ['', Validators.required],
    // Step 4 — Terms & Submit
    termsAccepted: [false, Validators.requiredTrue],
  });

  readonly isLastStep = computed(() => this.currentStep() === this.stepLabels.length - 1);
  readonly isFirstStep = computed(() => this.currentStep() === 0);

  /** null once age isn't yet filled in / valid — no verdict to show yet. */
  readonly derivedAgeGroup = computed(() => {
    const age = this.form.controls.age.value;
    return age && age >= 3 && age <= 17 ? deriveAgeGroup(age) : null;
  });

  readonly ageGroupMismatch = computed(() => {
    const derived = this.derivedAgeGroup();
    return derived !== null && derived !== this.selectedAccountType();
  });

  acceptDerivedAgeGroup(): void {
    const derived = this.derivedAgeGroup();
    if (derived) this.accountTypeChange.emit(derived);
  }

  constructor() {
    // Prefill Age from the entered Date of birth — still freely editable
    // afterward in case the exact birthdate isn't known.
    this.form.controls.dateOfBirth.valueChanges.subscribe((dob) => {
      const age = calculateAge(dob);
      if (age !== null) this.form.controls.age.setValue(age);
    });
  }

  toggleHearAbout(id: string): void {
    const next = new Set(this.selectedHearAbout());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.selectedHearAbout.set(next);
  }

  isHearAboutSelected(id: string): boolean {
    return this.selectedHearAbout().has(id);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  private stepControlNames(step: number): string[] {
    switch (step) {
      case 0:
        return ['firstName', 'surname', 'gender', 'dateOfBirth', 'age', 'school', 'gradeClass', 'country'];
      case 1:
        return ['parentGuardianName', 'parentPhone', 'parentWhatsapp', 'email', 'password'];
      case 2:
        return ['enrolProgram'];
      case 3:
        return ['growthAreas', 'desiredSkills'];
      case 4:
        return ['termsAccepted'];
      default:
        return [];
    }
  }

  isStepValid(step: number): boolean {
    const controlsValid = this.stepControlNames(step).every((name) => this.form.controls[name as keyof typeof this.form.controls].valid);
    if (step === 2) {
      const hearAboutValid =
        this.selectedHearAbout().size > 0 &&
        (!this.selectedHearAbout().has('other') || !!this.form.controls.howDidYouHearOther.value.trim());
      return controlsValid && hearAboutValid;
    }
    return controlsValid;
  }

  /** Whether "Next" should even be clickable for the current step — used
   *  to disable the button outright, not just reject the click, so a
   *  flagged problem (a field error, or step 0's age/tab mismatch) can't
   *  be clicked past. */
  canAdvance(step: number): boolean {
    if (!this.isStepValid(step)) return false;
    if (step === 0 && this.ageGroupMismatch()) return false;
    return true;
  }

  next(): void {
    if (!this.isStepValid(this.currentStep())) {
      this.stepControlNames(this.currentStep()).forEach((name) => this.form.controls[name as keyof typeof this.form.controls].markAsTouched());
      this.errorMessage.set('A few boxes still need filling in before moving on.');
      return;
    }
    if (this.currentStep() === 0 && this.ageGroupMismatch()) {
      this.errorMessage.set('Please resolve the age/tab mismatch above before moving on.');
      return;
    }
    this.errorMessage.set('');
    this.currentStep.update((s) => Math.min(s + 1, this.stepLabels.length - 1));
  }

  back(): void {
    this.errorMessage.set('');
    this.currentStep.update((s) => Math.max(s - 1, 0));
  }

  fieldInvalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.touched && control.invalid;
  }

  submit(): void {
    if (!this.isStepValid(4)) {
      this.form.controls.termsAccepted.markAsTouched();
      this.errorMessage.set('Please accept the Terms and Conditions to continue.');
      return;
    }

    this.errorMessage.set('');
    this.submitting.set(true);
    const raw = this.form.getRawValue();
    const age = raw.age!;
    const hearAbout = [...this.selectedHearAbout()];

    this.auth
      .register({
        firstName: raw.firstName,
        lastName: raw.surname,
        email: raw.email,
        password: raw.password,
        role: 'student',
        ageGroup: deriveAgeGroup(age),
        studentProfile: {
          middleName: raw.middleName || undefined,
          preferredName: raw.preferredName || undefined,
          gender: raw.gender as 'male' | 'female',
          dateOfBirth: raw.dateOfBirth,
          age,
          school: raw.school,
          gradeClass: raw.gradeClass,
          country: raw.country,
          parentGuardianName: raw.parentGuardianName,
          parentPhone: raw.parentPhone,
          parentWhatsapp: raw.parentWhatsapp,
          enrolProgram: raw.enrolProgram as 'soft-skills' | 'tech-skills' | 'language-skills' | 'personal-coaching',
          howDidYouHear: hearAbout,
          howDidYouHearOther: raw.howDidYouHearOther || undefined,
          growthAreas: raw.growthAreas,
          desiredSkills: raw.desiredSkills,
          termsAccepted: raw.termsAccepted,
        },
      })
      .subscribe({
        next: (user) => {
          this.submitting.set(false);
          this.router.navigate([ROLE_HOME_PATH[user.role]]);
        },
        error: (err: Error) => {
          this.submitting.set(false);
          this.errorMessage.set(err.message);
          this.sidekick.say('Hmm, that didn’t work. Want to try again?', 'oops', 3500);
        },
      });
  }
}
