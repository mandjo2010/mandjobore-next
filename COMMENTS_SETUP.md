# Configuration des Commentaires

Ce blog supporte plusieurs systèmes de commentaires. Voici comment les configurer :

## 1. Giscus (Recommandé) - Gratuit

Giscus utilise GitHub Discussions. C'est moderne, gratuit et sans publicité.

### Configuration :
1. Allez sur https://giscus.app/
2. Entrez votre repository : `mandjo2010/mandjobore-next`
3. Activez les Discussions dans votre repo GitHub
4. Copiez les valeurs générées dans `.env.local`

```env
NEXT_PUBLIC_COMMENTS_PROVIDER=giscus
NEXT_PUBLIC_GISCUS_REPO=mandjo2010/mandjobore-next
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
```

## 2. Disqus - Populaire

### Configuration :
1. Créez un compte sur https://disqus.com/
2. Créez un nouveau site
3. Notez votre "shortname"

```env
NEXT_PUBLIC_COMMENTS_PROVIDER=disqus
NEXT_PUBLIC_DISQUS_SHORTNAME=votre-shortname
```

## 3. Facebook Comments

### Configuration :
1. Créez une app Facebook sur https://developers.facebook.com/
2. Notez votre App ID

```env
NEXT_PUBLIC_COMMENTS_PROVIDER=facebook
NEXT_PUBLIC_FACEBOOK_APP_ID=votre-app-id
```

## 4. Désactiver les commentaires

```env
NEXT_PUBLIC_COMMENTS_PROVIDER=none
```

## Configuration actuelle

Le fichier `.env.local` est configuré pour utiliser Giscus par défaut.
Pour activer Giscus, vous devez :

1. Activer les Discussions sur votre repo GitHub
2. Obtenir les IDs depuis https://giscus.app/
3. Mettre à jour les valeurs dans `.env.local`
