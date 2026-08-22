import { useEffect, useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Instance, Instances } from '@react-three/drei'
import gsap from 'gsap'
import type { Group } from 'three'
import { buildRoleNodes } from '../data/graph'

// Phyllotaxis (golden-angle) spiral: a deterministic, evenly-spread
// scatter with no reliance on Math.random, so the field looks the same on
// every load and in screenshots. d3-force is reserved for the experience
// section's graph, which has real chronological edges to lay out; this
// field is ambient decoration with no edges, so a force simulation would
// be doing work it doesn't need to do.
//
// Flattened vertically and kept shallow in z on purpose: the hero canvas
// fills a wide, short box (the header, not the full viewport), so the
// scatter is tuned to that aspect ratio rather than a tall square.
function seededPosition(index: number, total: number): [number, number, number] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  const angle = index * goldenAngle
  const radius = 2 + (index / Math.max(total - 1, 1)) * 5
  const depthJitter = (((index * 5) % 7) / 7 - 0.5) * 2
  return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.4, depthJitter]
}

function AmbientNodes() {
  const groupRef = useRef<Group>(null)
  const nodes = useMemo(() => buildRoleNodes(), [])

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    // Motivated by: establishing "this is a live system" before the user
    // scrolls (docs/redesign/00-overview.md, Content mapping > Hero).
    gsap.fromTo(group.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 1.6, ease: 'power2.out' })

    const idle = gsap.to(group.rotation, {
      y: Math.PI * 2,
      duration: 120,
      repeat: -1,
      ease: 'none',
    })

    return () => {
      idle.kill()
    }
  }, [])

  return (
    <group ref={groupRef}>
      <Instances limit={nodes.length}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial color="#b5651d" transparent opacity={0.65} />
        {nodes.map((node, index) => (
          <Instance key={node.id} position={seededPosition(index, nodes.length)} />
        ))}
      </Instances>
    </group>
  )
}

/** Decorative backdrop only — see useWebGLCapable for when this mounts. */
export function HeroField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      <AmbientNodes />
    </Canvas>
  )
}
