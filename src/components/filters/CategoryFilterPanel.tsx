'use client'

export default function CategoryFilterPanel({
  active,
  categories,
  onClose,
  onPick,
}: {
  categories: string[]
  active: string
  onPick: (c: string) => void
  onClose: () => void
}) {
  return (
    <div role="dialog" aria-modal="true" className="catDialog">
      <div className="catBox">
        <button className="catClose" onClick={onClose}>
          ×
        </button>
        <ul>
          {['all posts', ...categories].map(c => (
            <li key={c}>
              <button
                className={c === active ? 'isActive' : ''}
                onClick={() => {
                  onPick(c)
                  onClose()
                }}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
