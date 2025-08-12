// scripts/copy-content.js
const fs = require('fs-extra')
const path = require('path')

async function run() {
	const src = path.join(process.cwd(), 'content')
	const dest = path.join(process.cwd(), 'public', 'content')
	await fs.remove(dest)
	await fs.copy(src, dest)
	console.log('✓ Copied content/ -> public/content/')
}

run().catch((e) => {
	console.error(e)
	process.exit(1)
})
