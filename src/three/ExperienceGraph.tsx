import { useEffect, useMemo, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { forceLink, forceManyBody, forceSimulation, forceX, forceY } from 'd3-force'
import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AchievementList } from '../components/AchievementList'
import { StatusBadge } from '../components/StatusBadge'
import { buildChronologicalEdges, buildTimelineNodes } from '../data/graph'
import type { TimelineNode } from '../data/graph'

gsap.registerPlugin(ScrollTrigger)

interface LayoutNode extends SimulationNodeDatum {
  id: string
}

interface PositionedNode extends TimelineNode {
  position: [number, number, number]
}

/**
 * d3-force lays this out (not the hero field's deterministic spiral)
 * because there's a real graph here: chronological edges the simulation
 * needs to respect. forceX spreads nodes along the primary "depth" axis
 * the camera travels; forceLink/forceManyBody give the organic y jitter
 * around that spine instead of a perfectly straight, boring line.
 */
function useTopologyLayout(nodes: TimelineNode[]): PositionedNode[] {
  return useMemo(() => {
    const simNodes: LayoutNode[] = nodes.map((node) => ({ id: node.id }))
    const edges = buildChronologicalEdges(nodes)
    const simLinks: SimulationLinkDatum<LayoutNode>[] = edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
    }))

    const simulation = forceSimulation(simNodes)
      .force('charge', forceManyBody().strength(-6))
      .force(
        'link',
        forceLink<LayoutNode, SimulationLinkDatum<LayoutNode>>(simLinks)
          .id((node) => node.id)
          .distance(5),
      )
      .force(
        'x',
        forceX<LayoutNode>((_node, index) => index * 6).strength(1),
      )
      .force('y', forceY(0).strength(0.25))
      .stop()

    for (let i = 0; i < 300; i += 1) simulation.tick()

    return nodes.map((node, index) => {
      const simNode = simNodes[index]
      const zJitter = index % 2 === 0 ? 0.6 : -0.6
      return {
        ...node,
        position: [simNode.x ?? index * 6, simNode.y ?? 0, zJitter] as [number, number, number],
      }
    })
  }, [nodes])
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

interface TopologySceneProps {
  nodes: PositionedNode[]
  progressRef: MutableRefObject<number>
}

function TopologyScene({ nodes, progressRef }: TopologySceneProps) {
  useFrame(({ camera }) => {
    const span = nodes.length - 1
    if (span <= 0) return

    const t = progressRef.current * span
    const index = Math.max(0, Math.min(Math.floor(t), span - 1))
    const frac = t - index
    const a = nodes[index]
    const b = nodes[index + 1]
    const x = lerp(a.position[0], b.position[0], frac)
    const y = lerp(a.position[1], b.position[1], frac)

    camera.position.set(x, y + 1.6, 7)
    camera.lookAt(x, y, 0)
  })

  return (
    <>
      {nodes.map((node) => (
        <mesh key={node.id} position={node.position}>
          <sphereGeometry args={[node.current ? 0.32 : 0.22, 16, 16]} />
          <meshBasicMaterial color={node.current ? '#d89a4e' : '#6fae87'} />
        </mesh>
      ))}
      {nodes.slice(0, -1).map((node, index) => (
        <Line
          key={`${node.id}::edge`}
          points={[node.position, nodes[index + 1].position]}
          color="#5b6470"
          transparent
          opacity={0.4}
          lineWidth={1}
        />
      ))}
    </>
  )
}

/**
 * The 3D topology: pins the section while GSAP ScrollTrigger scrubs a
 * mutable progress ref (never React state, see design-taste-frontend's
 * guidance on continuous values) that drives the camera flythrough. Only
 * the discrete "which node is active" changes go through useState, since
 * that's what the HUD panel actually needs to re-render on.
 */
export function ExperienceGraph() {
  const nodes = useMemo(() => buildTimelineNodes(), [])
  const positioned = useTopologyLayout(nodes)
  const wrapRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || positioned.length === 0) return

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: () => `+=${positioned.length * 600}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress
        const index = Math.round(self.progress * (positioned.length - 1))
        setActiveIndex((prev) => (prev === index ? prev : index))
      },
    })

    return () => {
      trigger.kill()
    }
  }, [positioned.length])

  const active = positioned[activeIndex]

  return (
    <div ref={wrapRef} className="topology">
      <div className="topology__canvas">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          aria-hidden="true"
        >
          <TopologyScene nodes={positioned} progressRef={progressRef} />
        </Canvas>
      </div>
      {active && (
        <div className="topology__hud" aria-live="polite">
          <div className="topology__hud-meta">
            <h3>{active.company}</h3>
            <StatusBadge current={active.current} />
          </div>
          <p className="stage__title">{active.title}</p>
          <p className="stage__range">{active.range}</p>
          <AchievementList achievements={active.achievements} scrollable />
        </div>
      )}
    </div>
  )
}
