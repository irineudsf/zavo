export function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', padding: '32px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: 2 }}>
          <span style={{ color: '#F5B800' }}>Z</span>AVO
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
          © 2026 Zavo · zavo.digital · Fundindo seu negócio ao mundo digital.
        </div>
      </div>
    </footer>
  )
}
