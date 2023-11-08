import { Field } from 'houseform'
import { twMerge } from 'tailwind-merge'

import type { ZodTypeAny } from 'zod'

export type InputProps = {
  className?: string
  label: string
  name: string
  placeholder?: string
  value?: any
  required?: boolean
  disabled?: boolean
  type?: 'text' | 'tel' | 'email'
  validate?: ZodTypeAny
}

const Input = ({
  className,
  label,
  name,
  placeholder,
  value,
  required,
  disabled,
  type = 'text',
  validate,
}: InputProps) => (
  <div className={twMerge('px-7 sm:w-[254px] sm:px-0', className)}>
    <div className={`inline-block w-full ${className}`}>
      <label htmlFor={name} className="block font-bold text-sm">
        {label}
        {required && <span className="text-[#026EBB] font-bold">*</span>}
      </label>
      <div className="relative">
        <Field name={name} initialValue={value} onChangeValidate={validate}>
          {({ value, setValue, onBlur, errors }) => (
            <>
              <input
                type={type}
                className={twMerge(
                  'block font-nunito text-base placeholder:text-[#A9A9A9] w-full h-[44px] py-[10px] pl-[11px] rounded border-solid border border-[#C3C9D2] disabled:bg-covr-neutral-200 disabled:border-covr-neutral-400 disabled:text-covr-neutral-800 disabled:cursor-not-allowed',
                )}
                value={value}
                disabled={disabled}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                onBlur={onBlur}
              />

              <div>
                {errors.map(error => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            </>
          )}
        </Field>
      </div>
    </div>
  </div>
)

export default Input
