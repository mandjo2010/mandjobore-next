const fs = require('fs')
const path = require('path')

const matter = require('gray-matter')

const PAGES_DIR = path.join(process.cwd(), 'content', 'pages')
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function getAllPostSlugs() {
	return fs
		.readdirSync(POSTS_DIR)
		.filter((name) => fs.existsSync(path.join(POSTS_DIR, name, 'index.md')))
}

function getPostBySlug(slug) {
	const file = fs.readFileSync(path.join(POSTS_DIR, slug, 'index.md'), 'utf8')
	const { content, data } = matter(file)
	return { content, frontmatter: data, slug }
}

function getAllPosts() {
	return getAllPostSlugs()
		.map(getPostBySlug)
		.sort(
			(a, b) =>
				new Date(b.frontmatter.date || 0) -
				new Date(a.frontmatter.date || 0)
		)
}

function getPageByKey(key) {
	const file = fs.readFileSync(path.join(PAGES_DIR, key, 'index.md'), 'utf8')
	const { content, data } = matter(file)
	return { content, frontmatter: data, key }
}

function getAllPages() {
	return fs.readdirSync(PAGES_DIR).map((key) => getPageByKey(key))
}

module.exports = {
	getAllPages,
	getAllPosts,
	getPageByKey,
	getPostBySlug,
	PAGES_DIR,
	POSTS_DIR,
}
