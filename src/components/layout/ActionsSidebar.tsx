import { useRouter } from 'next/router'
import ActionsBar from './ActionsBar'
import { useUIStore } from '@/store/ui'

export default function ActionsSidebar() {
  const router = useRouter()
  const toggleSearch = useUIStore((s: { toggleSearch: () => void }) => s.toggleSearch)

  return (
    <ActionsBar
      onHome={() => { void router.push('/') }}
      onToggleFilter={() => { /* Drawer géré par Layout */ }}
      onSearch={() => toggleSearch()}
      onToggleExpand={() => {
        if (document.fullscreenElement) {
          void document.exitFullscreen?.()
        } else {
          void document.documentElement.requestFullscreen?.()
        }
      }}
      expanded={!!document.fullscreenElement}
    />
  )
}
