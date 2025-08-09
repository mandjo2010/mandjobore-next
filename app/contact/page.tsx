'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Send, User, MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			// Simuler l'envoi (à remplacer par votre logique d'envoi réelle)
			await new Promise((resolve) => setTimeout(resolve, 1000))
			setSubmitted(true)
		} catch (error) {
			console.error('Erreur lors de l\'envoi:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	if (submitted) {
		return (
			<div className="max-w-4xl mx-auto px-6 py-8">
				<nav className="mb-8">
					<Link
						href="/"
						className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour à l'accueil
					</Link>
				</nav>

				<div className="text-center py-12">
					<div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
						<Send className="w-8 h-8 text-green-600 dark:text-green-400" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
						Message envoyé !
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mb-8">
						Merci pour votre message. Je vous répondrai dans les plus brefs délais.
					</p>
					<Button>
						<Link href="/">Retour à l'accueil</Link>
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="max-w-4xl mx-auto px-6 py-8">
			{/* Navigation */}
			<nav className="mb-8">
				<Link
					href="/"
					className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Retour à l'accueil
				</Link>
			</nav>

			{/* Header */}
			<header className="mb-12">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
					Contact
				</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
					Vous avez un projet en tête ? Une question ? N'hésitez pas à me contacter !
				</p>
			</header>

			<div className="grid md:grid-cols-2 gap-12">
				{/* Formulaire */}
				<div>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Nom complet
							</label>
							<div className="relative">
								<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
									placeholder="Votre nom"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Email
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
									placeholder="votre@email.com"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="subject"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Sujet
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								required
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								placeholder="Sujet de votre message"
							/>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Message
							</label>
							<div className="relative">
								<MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									required
									rows={6}
									className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
									placeholder="Votre message..."
								/>
							</div>
						</div>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full"
						>
							{isSubmitting ? (
								<span className="flex items-center">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Envoi en cours...
								</span>
							) : (
								<span className="flex items-center">
									<Send className="w-4 h-4 mr-2" />
									Envoyer le message
								</span>
							)}
						</Button>
					</form>
				</div>

				{/* Informations de contact */}
				<div>
					<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
							Autres moyens de me contacter
						</h2>

						<div className="space-y-4">
							<div className="flex items-center">
								<Mail className="w-5 h-5 text-primary-600 mr-3" />
								<div>
									<p className="font-medium text-gray-900 dark:text-white">
										Email
									</p>
									<a
										href="mailto:contact@mandjobore.com"
										className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
									>
										contact@mandjobore.com
									</a>
								</div>
							</div>

							<div className="flex items-center">
								<div className="w-5 h-5 mr-3 flex items-center justify-center">
									<span className="text-primary-600 font-bold">in</span>
								</div>
								<div>
									<p className="font-medium text-gray-900 dark:text-white">
										LinkedIn
									</p>
									<a
										href="#"
										className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
									>
										/in/mandjobore
									</a>
								</div>
							</div>
						</div>

						<div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
							<p className="text-sm text-blue-700 dark:text-blue-300">
								💡 <strong>Conseil :</strong> Plus votre message est détaillé, 
								plus je pourrai vous aider efficacement !
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
