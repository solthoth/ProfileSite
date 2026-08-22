/** Shared between the 2D pipeline rail and the 3D experience HUD panel. */
export function StatusBadge({ current }: { current: boolean }) {
  return (
    <span className={`badge ${current ? 'badge--current' : 'badge--ok'}`}>
      {current ? '● current' : '✓ complete'}
    </span>
  )
}
