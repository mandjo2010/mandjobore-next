import Image from 'next/image'
import Link from 'next/link'

export default function StartersPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-8">
			{/* Header */}
			<header className="mb-12">
				<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
					When art and science meet
				</h1>
				<div className="prose prose-lg dark:prose-invert max-w-none">
					<p>
						In this page, you will find some graphics that show where things are and why
						they're there. It's all about learning to communicate spatial information to tell
						you something interesting, to say some story that give some facts.
					</p>
					<p>
						As said <a href="https://twitter.com/kennethfield" className="text-blue-600 hover:text-blue-700">Kenneth</a>, cartographers make decisions all the time about what to put on the map and
						what to take off the map. Therefore, thank you for your compromise about things you
						will or not see.
					</p>
				</div>
			</header>

			{/* Project 1 */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
					1. Reference Map of Massachusetts
				</h2>
				<div className="prose prose-lg dark:prose-invert max-w-none mb-8">
					<p>
						I use ArcGIS Pro to make this reference map during the ESRI Cartography Mooc.
						ESRI offers generously data and instructions throughout the Mooc. The map shows
						the northeast region of the United States and focuses on the state of
						Massachusetts.
					</p>
					<p>
						The goal of the project was to symbolize and label layers through some basic
						symbol editing, label placement techniques, colors editing, setting a map
						projection and so on.
					</p>
				</div>
				<div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden mb-4">
					<Image
						src="/images/test-cover.svg"
						alt="Reference Map of Massachusetts"
						fill
						className="object-cover"
					/>
				</div>
			</section>

			{/* Project 2 */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
					2. Vietnam War bombing missions
				</h2>
				<div className="prose prose-lg dark:prose-invert max-w-none mb-8">
					<p>
						I use ArcGIS Pro to make this guiding map project from ESRI free courses. The
						CSV file is from the Vietnam page at <a href="https://insight.livestories.com/s/v2/vietnam/48973b96-8add-4898-9b33-af2a676b10bb/" className="text-blue-600 hover:text-blue-700">data.mil</a>, a public website compiled by the Defense Digital Service in collaboration with
						the United States Department of Defense.
					</p>
					<p>
						If you're history enthusiast, this map might be of your interest. I love the
						geoDesign that shows bombing missions during the Vietnam War.
					</p>
				</div>
				<div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden mb-4">
					<Image
						src="/images/test-cover.svg"
						alt="Vietnam War bombing missions"
						fill
						className="object-cover"
					/>
				</div>
				<div className="prose prose-lg dark:prose-invert max-w-none">
					<p>
						To make this layout, I added a layer of bombing missions and then symbolized
						them. I also added reference information (World cities, World Hillshade, World
						countries generalised) from ArcGIS Living Atlas before labeling each item. Then, I
						created a time series chart and hexagon bin inset map to provide more
						information about the data. Finally, I arranged all of the elements in a print layout
						(ANSI-Landscape, ANSI D 22" x34"), prioritizing visual clarity and aesthetics.
					</p>
				</div>
			</section>

			{/* Project 3 */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
					3. Results of 2015 UK election
				</h2>
				<div className="prose prose-lg dark:prose-invert max-w-none mb-8">
					<p>
						These choropleth maps are made from the data of the electoral constituencies for
						the United Kingdom of Great Britain and Northern Ireland. I used ArcGIS Pro
						from Esri Training to explore three methods (natural breaks classification,
						quantile classification, unclassed representation) of classifying numerical data for
						thematic mapping. Lighter shades match lower data values and the darker ones match
						higher data values.
					</p>
				</div>
				<div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden mb-4">
					<Image
						src="/images/test-cover.svg"
						alt="Results of 2015 UK election"
						fill
						className="object-cover"
					/>
				</div>
				<div className="prose prose-lg dark:prose-invert max-w-none">
					<p>
						The same dataset has been used to develop a range of alternative thematic maps
						that tell the story of the 2015 general election of the United Kingdom of Great
						Britain and Northern Ireland. The thematic map showing the winning political
						party in each area using a unique value(winning party) symbolized of by the
						political party. A graduate color (choropleth) map that show the share of the votes that
						the winning members of Parliament received.
					</p>
				</div>
			</section>

			{/* Project 4 */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
					4. Alaska Fire Service (AFS)
				</h2>
				<div className="prose prose-lg dark:prose-invert max-w-none mb-8">
					<p>
						AFS provides wildland fire management. I use QGIS software to access AFS's GIS <a href="https://fire.ak.blm.gov/arcgis/rest/services/MapAndFeatureServices" className="text-blue-600 hover:text-blue-700">data Service</a> from ArcGIS Server.
					</p>
					<p>
						After exploring AFS Data in QGIS, I display fire perimeters in a category of
						fireseasons and apply some filter to extract desired information from the dataset.
						From that analysis, I find out that in 1950, the fire called Little Black River
						burned the most acres from 1940(80 years) in Alaska Fire History.
					</p>
					<p>
						I also use the Group Stats tool in QGIS to extract data statistics (burn area
						and burn counts) from historic fire perimeters data of Alaska dataset.
					</p>
				</div>
				<div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden mb-8">
					<Image
						src="/images/test-cover.svg"
						alt="Alaska Fire Service analysis"
						fill
						className="object-cover"
					/>
				</div>
			</section>

			{/* Footer with author info */}
			<footer className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-16">
				<div className="text-center">
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						Mandjo Béa Boré
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						Data analyst - Developer
					</p>
				</div>

				<div className="mt-8">
					<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Additional Links
					</h4>
					<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-1 text-sm">
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
							Covid-19 Data Visualization Build and publish your COVID-19 dashboard
						</Link>
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
							Remote Sensing of Mt. Kenya Wildfire How satellite imagery and the science of remote sensing detect wildfires, help manage their spread, and guide ecological restoration
						</Link>
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
							Ten Reasons to Choose SILAT Are you considering studying Spacial Data Science in France ?
						</Link>
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
							Finding Geographic Data Finding GIS Data on the web from wide range of sources
						</Link>
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
							How to Reconcile Mining and Biodiversity Preservation A mining case study in Guinea
						</Link>
						<Link href="/blog" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
							A System for Economic, Sociocultural, and Environmental Benefits The role of agroforestry in providing a wide range of benefits
						</Link>
						<Link href="/about" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
							About
						</Link>
						<Link href="/starters" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
							Cartography
						</Link>
						<Link href="/starters" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
							Portfolio
						</Link>
						<Link href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
							Contact
						</Link>
					</div>
				</div>
			</footer>
		</div>
	)
}
