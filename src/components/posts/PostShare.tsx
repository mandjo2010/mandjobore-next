import * as React from 'react'
import { Stack, IconButton, Tooltip } from '@mui/material'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import { siteConfig } from '@/lib/config'

export default function PostShare({ slug, title }: { slug: string; title: string }) {
  const base = siteConfig.siteUrl || siteConfig.url
  const url = `${base.replace(/\/$/, '')}/posts/${slug}`

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip title="Share on Twitter">
        <span>
          <TwitterShareButton url={url} title={title}>
            <IconButton size="small" aria-label="Share on Twitter">𝕏</IconButton>
          </TwitterShareButton>
        </span>
      </Tooltip>
      <Tooltip title="Share on LinkedIn">
        <span>
          <LinkedinShareButton url={url} title={title}>
            <IconButton size="small" aria-label="Share on LinkedIn">in</IconButton>
          </LinkedinShareButton>
        </span>
      </Tooltip>
      <Tooltip title="Share on Facebook">
        <span>
          <FacebookShareButton url={url} quote={title}>
            <IconButton size="small" aria-label="Share on Facebook">f</IconButton>
          </FacebookShareButton>
        </span>
      </Tooltip>
    </Stack>
  )
}
