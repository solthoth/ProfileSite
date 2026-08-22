// Feasibility spike for docs/redesign/00-overview.md — NOT wired into the
// live app (nothing in src/App.tsx imports this). Confirms
// three / @react-three/fiber / @react-three/drei / gsap / d3-force all
// resolve, type-check under this project's strict TS config, and render
// together under React 19 + Vite 8. Delete or promote once Phase 3 of the
// roadmap in 00-overview.md begins.
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instance, Instances } from '@react-three/drei'
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'
import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force'
import gsap from 'gsap'
import type { Group } from 'three'

interface GraphNode extends SimulationNodeDatum {
  id: string
}

function useGraphLayout(nodeIds: string[], links: [string, string][]) {
  return useMemo(() => {
    const nodes: GraphNode[] = nodeIds.map((id) => ({ id }))
    const simLinks: SimulationLinkDatum<GraphNode>[] = links.map(([source, target]) => ({
      source,
      target,
    }))

    const simulation = forceSimulation(nodes)
      .force('charge', forceManyBody().strength(-40))
      .force(
        'link',
        forceLink<GraphNode, SimulationLinkDatum<GraphNode>>(simLinks)
          .id((node) => node.id)
          .distance(6),
      )
      .force('center', forceCenter(0, 0))
      .stop()

    for (let i = 0; i < 200; i += 1) simulation.tick()

    return nodes.map((node) => ({
      id: node.id,
      position: [node.x ?? 0, node.y ?? 0, 0] as [number, number, number],
    }))
  }, [nodeIds, links])
}

function RotatingGraph() {
  const groupRef = useRef<Group>(null)
  const nodes = useGraphLayout(
    ['blue-shield', 'allergan', 'shell-recharge', 'green-dot', 'lightstream'],
    [
      ['blue-shield', 'allergan'],
      ['allergan', 'shell-recharge'],
      ['shell-recharge', 'green-dot'],
      ['green-dot', 'lightstream'],
    ],
  )

  useEffect(() => {
    if (!groupRef.current) return
    const tween = gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: 'none',
    })
    return () => {
      tween.kill()
    }
  }, [])

  useFrame((state) => {
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={groupRef}>
      <Instances limit={nodes.length}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#b5651d" />
        {nodes.map((node) => (
          <Instance key={node.id} position={node.position} />
        ))}
      </Instances>
    </group>
  )
}

export function CareerGraphSpike() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <RotatingGraph />
    </Canvas>
  )
}
