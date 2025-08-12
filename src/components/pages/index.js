import ThreeColumns from '../src/components/layout/ThreeColumns'
import LeftSidebar from '../src/components/sidebar/LeftSidebar'
import RightActions from '../src/components/sidebar/RightActions'
import PostCard from '../src/components/posts/PostCard'
import { getAllPosts } from '../lib/content'
import { Box } from '@mui/material'

export default function Home({ posts }) {
	return (
		<ThreeColumns
			left={<LeftSidebar />}
			center={
				<Box>
					{posts.map((p) => (
						<PostCard key={p.slug} post={p} />
					))}
				</Box>
			}
			right={
				<RightActions
					onBack={() => window.location.assign('/')}
					onSearch={() => {}}
					onFullscreen={() =>
						document.documentElement.requestFullscreen?.()
					}
					onScrollTop={() =>
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}
				/>
			}
		/>
	)
}

export async function getStaticProps() {
	const posts = getAllPosts()
	return { props: { posts } }
}
