import Image from 'next/image'

export default function PostAuthor() {
  return (
    <div
      style={{
        alignItems: 'center',
        borderTop: '1px solid #ddd',
        display: 'flex',
        gap: 12,
        marginTop: '2rem',
        paddingTop: '2rem',
      }}
    >
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '75% 65%',
          height: 60,
          overflow: 'hidden',
          position: 'relative',
          width: 60,
        }}
      >
        <Image src="/images/avatar.svg" alt="" fill sizes="60px" />
      </div>
      <div>
        <strong>Mandjo Béa Boré</strong>
        <p style={{ color: 'var(--muted)', margin: 0 }}>
          Data analyst – Developer. Design and build geospatial apps.
        </p>
      </div>
    </div>
  )
}
