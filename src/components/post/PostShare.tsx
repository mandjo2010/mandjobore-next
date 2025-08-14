'use client'

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share'

export default function PostShare({
  excerpt,
  title,
  url,
}: {
  url: string
  title: string
  excerpt?: string
}) {
  const size = 36
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 12, padding: '16px 0' }}>
      <span style={{ fontSize: '1.1rem', marginRight: 8 }}>SHARE</span>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon round size={size} />
      </TwitterShareButton>
      <FacebookShareButton url={url} hashtag={`${title} - ${excerpt ?? ''}`}>
        <FacebookIcon round size={size} />
      </FacebookShareButton>
      <LinkedinShareButton url={url} title={title} summary={excerpt}>
        <LinkedinIcon round size={size} />
      </LinkedinShareButton>
    </div>
  )
}
