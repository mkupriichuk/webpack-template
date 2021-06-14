import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import style from './Button.module.scss'

interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	type: 'big' | 'normal',
	children: React.ReactNode
}

export const Button = ({type, className,children, ...props}: ButtonProps): JSX.Element => {
	return (
		<button {...props} className={style.btn}>
			{children}
		</button>
	)
}

