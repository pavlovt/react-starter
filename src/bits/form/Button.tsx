import { twMerge } from 'tailwind-merge'

export const buttonTypes = ['default', 'link', 'warn', 'inactive', 'outline', 'icon'] as const

type ButtonTypes = (typeof buttonTypes)[number]

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonTypes
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  className = '',
  disabled,
  onClick,
  variant = 'default',
  type = 'button',
  children,
  ...props
}: ButtonProps) => {
  let styleClass = ''
  let colorClass = ''
  const bgBlue = 'bg-covr-primary disabled:bg-covr-neutral-200 disabled:text-covr-neutral-400 text-white'
  const textBlue = 'disabled:text-covr-neutral-400 text-covr-primary'
  const bgRed = 'bg-covr-negative-200 disabled:bg-covr-neutral-200 disabled:text-covr-neutral-400 text-white'
  const bgGray = 'bg-covr-neutral-200 disabled:bg-covr-neutral-200 disabled:text-covr-neutral-400 text-covr-neutral-400'

  switch (variant) {
    case 'default':
      styleClass = 'disabled:cursor-not-allowed rounded min-w-40 min-h-11 px-[24px] font-bold text-base '
      colorClass = bgBlue
      break
    case 'link':
      styleClass = 'disabled:cursor-not-allowed rounded min-w-40 min-h-11 font-bold text-base bg-transparent'
      colorClass = textBlue
      break
    case 'warn':
      styleClass = 'disabled:cursor-not-allowed rounded min-w-40 min-h-11 px-[24px] font-bold text-base '
      colorClass = bgRed
      break
    case 'inactive':
      styleClass =
        'cursor-not-allowed disabled:cursor-not-allowed rounded min-w-40 px-[24px] min-h-11 font-bold text-base '
      colorClass = bgGray
      break
    case 'outline':
      styleClass =
        'border text-covr-neutral-400 disabled:cursor-not-allowed rounded min-w-40 min-h-11 px-[24px] font-bold text-base '
      break
    case 'icon':
      styleClass =
        'border rounded text-covr-primary bg-white w-[32px] h-[32px] font-bold text-base flex items-center justify-center'
      colorClass = ''
      break
    default:
      styleClass = ''
      colorClass = ''
  }

  return (
    <button
      className={twMerge('hover:cursor-pointer', styleClass, colorClass, className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  )
}

export default Button
