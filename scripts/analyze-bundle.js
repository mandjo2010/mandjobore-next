#!/usr/bin/env node

/**
 * Bundle Size Monitor
 * Surveille et rapporte la taille des bundles Next.js
 */

const fs = require('fs');
const path = require('path');

const BUNDLE_SIZE_LIMITS = {
  firstLoadJS: 244 * 1024, // 244 KB
  pageBundle: 128 * 1024,   // 128 KB  
  sharedBundle: 128 * 1024  // 128 KB
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function analyzeBundleSizes() {
  const buildManifestPath = path.join(process.cwd(), '.next', 'build-manifest.json');
  
  if (!fs.existsSync(buildManifestPath)) {
    console.error('❌ Build manifest not found. Run `npm run build` first.');
    process.exit(1);
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf8'));
    const staticDir = path.join(process.cwd(), '.next', 'static');
    
    console.log('\n📊 Bundle Size Analysis\n');
    console.log('═'.repeat(50));
    
    // Analyze each page
    let totalSize = 0;
    let warnings = [];
    
    Object.entries(manifest.pages).forEach(([page, files]) => {
      let pageSize = 0;
      
      files.forEach(file => {
        const filePath = path.join(staticDir, file);
        if (fs.existsSync(filePath)) {
          const size = fs.statSync(filePath).size;
          pageSize += size;
          totalSize += size;
        }
      });
      
      const status = pageSize > BUNDLE_SIZE_LIMITS.pageBundle ? '⚠️ ' : '✅';
      console.log(`${status} ${page.padEnd(20)} ${formatBytes(pageSize)}`);
      
      if (pageSize > BUNDLE_SIZE_LIMITS.pageBundle) {
        warnings.push(`Page ${page} exceeds recommended size (${formatBytes(pageSize)})`);
      }
    });
    
    console.log('═'.repeat(50));
    console.log(`📦 Total Bundle Size: ${formatBytes(totalSize)}`);
    
    // Check first load JS
    const mainFiles = manifest.pages['/'] || [];
    let firstLoadSize = 0;
    mainFiles.forEach(file => {
      const filePath = path.join(staticDir, file);
      if (fs.existsSync(filePath)) {
        firstLoadSize += fs.statSync(filePath).size;
      }
    });
    
    const firstLoadStatus = firstLoadSize > BUNDLE_SIZE_LIMITS.firstLoadJS ? '⚠️ ' : '✅';
    console.log(`${firstLoadStatus} First Load JS: ${formatBytes(firstLoadSize)}`);
    
    if (firstLoadSize > BUNDLE_SIZE_LIMITS.firstLoadJS) {
      warnings.push(`First Load JS exceeds recommended size (${formatBytes(firstLoadSize)})`);
    }
    
    // Display warnings
    if (warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      warnings.forEach(warning => console.log(`   • ${warning}`));
      console.log('\n💡 Consider using dynamic imports or code splitting.');
    } else {
      console.log('\n✅ All bundle sizes are within recommended limits!');
    }
    
    // Performance tips
    console.log('\n🚀 Performance Tips:');
    console.log('   • Use dynamic imports for heavy components');
    console.log('   • Optimize images with next/image');
    console.log('   • Remove unused dependencies');
    console.log('   • Use Next.js built-in optimizations');
    
  } catch (error) {
    console.error('❌ Error analyzing bundles:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  analyzeBundleSizes();
}

module.exports = { analyzeBundleSizes, formatBytes };
