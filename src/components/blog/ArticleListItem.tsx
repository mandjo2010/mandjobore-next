import Image from 'next/image'
import Link from 'next/link'

type Props = { href: string; title: string; excerpt?: string; image: string }

export default function ArticleListItem({ excerpt = '', href, image, title }: Props) {
  return (
    <li className="postItem">
      <Link href={href} className="postItemLink">
        <div className="postThumb" aria-hidden="true">
          <Image src={image} alt="" fill sizes="75px" priority={false} />
        </div>
        <div className="postMeta">
          <h2 className="postTitle">{title}</h2>
          {excerpt && <p className="postExcerpt">{excerpt}</p>}
        </div>
      </Link>
    </li>
  )
}