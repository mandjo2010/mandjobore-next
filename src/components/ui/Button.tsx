import React, { ReactNode, ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
	size?: 'sm' | 'md' | 'lg'
	children: ReactNode
}

const buttonVariants = {
	ghost: 'hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-900 dark:text-secondary-100',
	outline:
		'border border-secondary-300 dark:border-secondary-600 hover:bg-secondary-50 dark:hover:bg-secondary-800 text-secondary-900 dark:text-secondary-100',
	primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm',
	secondary:
		'bg-secondary-100 hover:bg-secondary-200 text-secondary-900 dark:bg-secondary-800 dark:hover:bg-secondary-700 dark:text-secondary-100',
}

const buttonSizes = {
	lg: 'px-6 py-3 text-base',
	md: 'px-4 py-2 text-sm',
	sm: 'px-3 py-1.5 text-sm',
}

export default function Button({
	children,
	className,
	size = 'md',
	variant = 'primary',
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none',
				buttonVariants[variant],
				buttonSizes[size],
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}
