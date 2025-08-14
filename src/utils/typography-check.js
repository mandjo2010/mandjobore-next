// Script de vérification des styles typographiques
// À exécuter dans la console du navigateur pour diagnostiquer les problèmes

function checkTypographyStyles() {
  console.log('🔍 VÉRIFICATION DES STYLES TYPOGRAPHIQUES');
  console.log('==========================================');
  
  // Vérification des titres
  const titles = document.querySelectorAll('.blog-title, .article-title, .post-title, h1');
  console.log(`📝 Titres trouvés: ${titles.length}`);
  
  titles.forEach((title, index) => {
    const styles = window.getComputedStyle(title);
    console.log(`\n📋 Titre ${index + 1}:`);
    console.log(`   Classes: ${title.className}`);
    console.log(`   Font-size: ${styles.fontSize} (attendu: 27px)`);
    console.log(`   Line-height: ${styles.lineHeight} (attendu: 31px)`);
    console.log(`   Font-weight: ${styles.fontWeight} (attendu: 600)`);
    console.log(`   Font-family: ${styles.fontFamily}`);
    console.log(`   Color: ${styles.color}`);
    
    // Vérification des erreurs
    if (styles.fontSize !== '27px') {
      console.warn(`   ❌ ERREUR: Font-size incorrect (${styles.fontSize} au lieu de 27px)`);
    } else {
      console.log(`   ✅ Font-size correct`);
    }
    
    if (styles.lineHeight !== '31px') {
      console.warn(`   ❌ ERREUR: Line-height incorrect (${styles.lineHeight} au lieu de 31px)`);
    } else {
      console.log(`   ✅ Line-height correct`);
    }
  });
  
  // Vérification des sous-titres
  const subtitles = document.querySelectorAll('.blog-subtitle, .article-subtitle, .post-subtitle, h2');
  console.log(`\n📝 Sous-titres trouvés: ${subtitles.length}`);
  
  subtitles.forEach((subtitle, index) => {
    const styles = window.getComputedStyle(subtitle);
    console.log(`\n📋 Sous-titre ${index + 1}:`);
    console.log(`   Classes: ${subtitle.className}`);
    console.log(`   Font-size: ${styles.fontSize} (attendu: 23px)`);
    console.log(`   Line-height: ${styles.lineHeight} (attendu: 27px)`);
    console.log(`   Font-weight: ${styles.fontWeight} (attendu: 300)`);
    console.log(`   Font-family: ${styles.fontFamily}`);
    console.log(`   Color: ${styles.color}`);
    
    // Vérification des erreurs
    if (styles.fontSize !== '23px') {
      console.warn(`   ❌ ERREUR: Font-size incorrect (${styles.fontSize} au lieu de 23px)`);
    } else {
      console.log(`   ✅ Font-size correct`);
    }
    
    if (styles.lineHeight !== '27px') {
      console.warn(`   ❌ ERREUR: Line-height incorrect (${styles.lineHeight} au lieu de 27px)`);
    } else {
      console.log(`   ✅ Line-height correct`);
    }
  });
  
  // Vérification des CSS personnalisés
  console.log('\n🎨 VÉRIFICATION DES RÈGLES CSS:');
  
  try {
    const stylesheets = Array.from(document.styleSheets);
    const customRules = [];
    
    stylesheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules || []);
        rules.forEach(rule => {
          if (rule.selectorText && 
              (rule.selectorText.includes('blog-title') || 
               rule.selectorText.includes('blog-subtitle'))) {
            customRules.push({
              fontSize: rule.style.fontSize,
              important: rule.cssText.includes('!important'),
              lineHeight: rule.style.lineHeight,
              selector: rule.selectorText
            });
          }
        });
      } catch (e) {
        // Ignore cross-origin stylesheet errors
      }
    });
    
    console.log('Règles CSS trouvées:');
    customRules.forEach(rule => {
      console.log(`   ${rule.selector}:`);
      console.log(`     font-size: ${rule.fontSize}`);
      console.log(`     line-height: ${rule.lineHeight}`);
      console.log(`     important: ${rule.important}`);
    });
    
  } catch (e) {
    console.log('Impossible de vérifier les règles CSS:', e.message);
  }
  
  console.log('\n✨ Vérification terminée!');
  console.log('Si des erreurs persistent, vérifiez l\'ordre de chargement des CSS et la spécificité.');
}

// Auto-exécution si dans un navigateur
if (typeof window !== 'undefined') {
  console.log('Script de vérification typographique chargé. Exécutez checkTypographyStyles() pour diagnostiquer.');
}

// Export pour Node.js
if (typeof module !== 'undefined') {
  module.exports = { checkTypographyStyles };
}
