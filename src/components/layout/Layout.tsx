'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

interface LayoutProps {
	children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
			{/* Layout simple - chaque page gère sa propre structure */}
			<div className='min-h-screen bg-white'>
				{children}
			</div>
		</ThemeProvider>
	)
}
