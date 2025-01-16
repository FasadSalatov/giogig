export function NoiseFilter() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay"
      style={{
        background: `
          radial-gradient(circle at center, rgba(0,0,0,0) 0, rgba(0,0,0,0.5) 100%),
          repeating-conic-gradient(from 0deg, rgba(255,255,255,0.03) 0deg 10deg, rgba(0,0,0,0.03) 10deg 20deg)
        `,
        backgroundSize: '200% 200%, 20px 20px',
        animation: 'noise 4s linear infinite'
      }}
    />
  )
}
