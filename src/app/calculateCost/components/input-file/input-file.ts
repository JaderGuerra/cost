import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';
import type { InputMode, InputType } from '../../types/inputType';

@Component({
  selector: 'input-file',
  standalone: true,
  styleUrl: './input-file.css',
  templateUrl: './input-file.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFile {
  label = input<string>('')
  placeholder = input<string>('')
  value = input<string | number>('')
  type = input<InputType>('text');
  autofocus = input<boolean>(false);
  inputMode = input<InputMode>('text');

  inputEl = viewChild<ElementRef<HTMLInputElement>>('inputRef');

  valueChange = output<string>()

  props = input<Partial<HTMLInputElement>>({});

  constructor() {

    afterNextRender(() => {
      if (this.autofocus()) {
        this.inputEl()?.nativeElement.focus();
      }
    });
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim()
    this.valueChange.emit(value)
  }
}
