"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import Image from "next/image"
import { projects } from "@/lib/projects"

type Props = { progress: RefObject<number>; paused: boolean }

export default function PortfolioWorld({ progress, paused }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const playing = useRef(!paused)
  const redraw = useRef<() => void>(() => {})
  const [ready, setReady] = useState(false)
  const [portraitReady, setPortraitReady] = useState(false)
  useEffect(() => { playing.current = !paused; redraw.current() }, [paused])

  useEffect(() => {
    const element = host.current
    if (!element) return
    let disposed = false
    let cleanup = () => {}
    async function initialize() {
      const [T, { RoomEnvironment }] = await Promise.all([import("three"), import("three/addons/environments/RoomEnvironment.js")])
      if (disposed) return
      let renderer: InstanceType<typeof T.WebGLRenderer>
      try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }) } catch { return }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x030911, 0)
      renderer.toneMapping = T.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.1
      element!.appendChild(renderer.domElement)
      const scene = new T.Scene()
      scene.fog = new T.FogExp2(0x030911, 0.035)
      const camera = new T.PerspectiveCamera(55, 1, 0.1, 120)
      const room = new RoomEnvironment()
      const generator = new T.PMREMGenerator(renderer)
      const environment = generator.fromScene(room, 0.04)
      scene.environment = environment.texture
      room.dispose(); generator.dispose()
      const geometries: InstanceType<typeof T.BufferGeometry>[] = []
      const materials: InstanceType<typeof T.Material>[] = []
      const textures: InstanceType<typeof T.Texture>[] = []
      const keepGeometry = <G extends InstanceType<typeof T.BufferGeometry>>(geometry: G): G => { geometries.push(geometry); return geometry }
      const keepMaterial = <M extends InstanceType<typeof T.Material>>(material: M): M => { materials.push(material); return material }
      let seed = 42
      const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 }

      // A volumetric field and a rippling floor give the camera a world to travel through.
      const particleCount = window.innerWidth < 768 ? 2600 : 5200
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const cyan = new T.Color(0x80e7ff), blue = new T.Color(0x548eff), pink = new T.Color(0xc472ff)
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (random() - 0.5) * 34
        positions[i * 3 + 1] = i < particleCount * 0.72 ? -3.5 + random() * 0.65 : (random() - 0.5) * 15
        positions[i * 3 + 2] = 8 - random() * 88
        const color = i % 3 === 0 ? pink : i % 3 === 1 ? blue : cyan
        colors.set([color.r, color.g, color.b], i * 3)
      }
      const particleGeometry = keepGeometry(new T.BufferGeometry())
      particleGeometry.setAttribute("position", new T.BufferAttribute(positions, 3))
      particleGeometry.setAttribute("color", new T.BufferAttribute(colors, 3))
      const particleMaterial = keepMaterial(new T.ShaderMaterial({
        uniforms: { time: { value: 0 }, pixelRatio: { value: renderer.getPixelRatio() } },
        vertexColors: true, transparent: true, depthWrite: false, blending: T.AdditiveBlending,
        vertexShader: `uniform float time; uniform float pixelRatio; varying vec3 vColor; varying float vDepth;
          void main() { vec3 p = position; p.y += sin(p.x * 0.6 + p.z * 0.22 + time * 0.22) * 0.55;
          p.x += sin(p.z * 0.17 + time * 0.08) * 0.45; vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv; gl_PointSize = clamp(60.0 / max(1.0, -mv.z), 1.3, 4.5) * pixelRatio;
          vColor = color; vDepth = exp(-max(0.0, -mv.z) * 0.015); }`,
        fragmentShader: `varying vec3 vColor; varying float vDepth; void main() {
          float d = length(gl_PointCoord - vec2(0.5)); if (d > 0.5) discard;
          gl_FragColor = vec4(vColor, pow(1.0 - d * 2.0, 1.4) * vDepth); }`,
      }))
      scene.add(new T.Points(particleGeometry, particleMaterial))

      const metallic = keepMaterial(new T.MeshPhysicalMaterial({ color: 0x6fb3dd, metalness: 1, roughness: 0.21, iridescence: 0.85, iridescenceIOR: 1.4, clearcoat: 1, envMapIntensity: 1.1 }))
      const shardGeometry = keepGeometry(new T.IcosahedronGeometry(0.34, 1))
      const shards = new T.InstancedMesh(shardGeometry, metallic, 60)
      const dummy = new T.Object3D()
      for (let i = 0; i < 60; i++) {
        dummy.position.set((random() - 0.5) * 22, (random() - 0.5) * 11, -random() * 72)
        dummy.rotation.set(random() * 6, random() * 6, random() * 6)
        const scale = 0.4 + random() * 1.2
        dummy.scale.set(scale, scale * (1 + random() * 2), scale * 0.45)
        dummy.updateMatrix(); shards.setMatrixAt(i, dummy.matrix)
      }
      scene.add(shards)

      // Frame the portrait in the entrance with metallic rings and fluid strands.
      const entrance = new T.Group()
      entrance.position.set(0, 1.25, 0)
      const ringGeometry = keepGeometry(new T.TorusGeometry(1.25, 0.035, 12, 100))
      entrance.add(new T.Mesh(ringGeometry, metallic))
      const inner = new T.Mesh(ringGeometry, metallic)
      inner.scale.setScalar(0.86); inner.rotation.y = 0.35; entrance.add(inner)
      const loader = new T.TextureLoader()
      const portraitTexture = loader.load("/profile.jpg", texture => {
        if (disposed) return
        const image = texture.image as HTMLImageElement
        const ratio = image.width / image.height
        texture.repeat.set(Math.min(1, 1 / ratio), Math.min(1, ratio))
        texture.offset.set((1 - texture.repeat.x) / 2, 1 - texture.repeat.y)
        setPortraitReady(true)
        requestRender()
      })
      portraitTexture.colorSpace = T.SRGBColorSpace
      textures.push(portraitTexture)
      const portraitMesh = new T.Mesh(keepGeometry(new T.CircleGeometry(1.07, 80)), keepMaterial(new T.MeshBasicMaterial({ map: portraitTexture, side: T.DoubleSide, toneMapped: false })))
      // Keep the photograph in the HTML layer so it remains crisp during WebGL loading.
      portraitMesh.visible = false
      portraitMesh.position.z = 0.08
      entrance.add(portraitMesh)
      scene.add(entrance)
      const ribbons: InstanceType<typeof T.Mesh>[] = []
      for (let index = 0; index < 2; index++) {
        const points = Array.from({ length: 64 }, (_, step) => {
          const t = step / 63, angle = t * Math.PI * 3 + index * Math.PI
          return new T.Vector3(Math.sin(angle) * (0.7 + t), -4.5 + t * 8.5, Math.cos(angle) * 0.8 - 0.4)
        })
        const ribbon = new T.Mesh(keepGeometry(new T.TubeGeometry(new T.CatmullRomCurve3(points), 120, 0.025, 8, false)), metallic)
        ribbon.position.z = -1.8
        scene.add(ribbon); ribbons.push(ribbon)
      }

      const panels: InstanceType<typeof T.Mesh>[] = []
      const panelGroups: InstanceType<typeof T.Group>[] = []
      const panelGeometry = keepGeometry(new T.PlaneGeometry(6.3, 3.9))
      const frameGeometry = keepGeometry(new T.EdgesGeometry(panelGeometry))
      const frameMaterial = keepMaterial(new T.LineBasicMaterial({ color: 0x8fcde4, transparent: true, opacity: 0.38 }))
      projects.forEach((project, index) => {
        const group = new T.Group()
        group.position.set(index % 2 === 0 ? 1.6 : -1.6, 0.45, -8 * (index + 1))
        group.rotation.y = index % 2 === 0 ? -0.12 : 0.12
        const texture = loader.load(project.image, () => { if (!disposed) requestRender() })
        texture.colorSpace = T.SRGBColorSpace
        textures.push(texture)
        const material = keepMaterial(new T.MeshBasicMaterial({ map: texture, color: 0xc8dbea, side: T.DoubleSide, transparent: true, opacity: 0.92 }))
        const panel = new T.Mesh(panelGeometry, material)
        panel.userData.projectId = project.id
        panels.push(panel); group.add(panel)
        group.add(new T.LineSegments(frameGeometry, frameMaterial))
        // A halo behind each project separates the panels from the deep particle field.
        const halo = new T.Mesh(keepGeometry(new T.TorusGeometry(3, 0.013, 8, 120)), keepMaterial(new T.MeshBasicMaterial({ color: index % 2 ? 0xba6aff : 0x4ad9ff, transparent: true, opacity: 0.3 })))
        halo.position.z = -1.8; halo.rotation.x = 0.45; group.add(halo)
        panelGroups.push(group); scene.add(group)
      })
      scene.add(new T.AmbientLight(0x71a4d8, 1.5))
      const key = new T.DirectionalLight(0x6bddff, 4)
      key.position.set(4, 5, 8); scene.add(key)
      const rim = new T.DirectionalLight(0xcc83ff, 3)
      rim.position.set(-5, -2, 2); scene.add(rim)
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      const pointer = { x: 0, y: 0 }
      let frame = 0, previous = 0, elapsed = 0, visible = true, contextLost = false, portrait = false
      const render = (time: number) => {
        frame = 0
        if (disposed || contextLost) return
        const active = playing.current && !reduced.matches
        const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0
        previous = time
        if (active) elapsed += delta
        const p = reduced.matches ? Math.round(progress.current * projects.length) / projects.length : progress.current
        const distance = p * projects.length
        const focusX = Math.sin(distance * Math.PI - Math.PI / 2) * 1.6 * Math.min(1, distance) * (portrait ? 0.3 : 1)
        camera.position.set(focusX * 0.4 + pointer.x * 0.5, pointer.y * 0.35, (portrait ? 12 : 10) - distance * 8)
        camera.lookAt(focusX * 0.65, 0.15, camera.position.z - 12)
        entrance.rotation.y = Math.sin(elapsed * 0.2) * 0.2
        entrance.scale.setScalar(portrait ? 1.55 : 2.4)
        entrance.position.x = portrait ? 0 : Math.min(3.2, camera.aspect * 1.8)
        entrance.position.y = (portrait ? 1.9 : 0.65) + Math.sin(elapsed * 0.5) * 0.08
        entrance.visible = distance < 0.6
        ribbons.forEach((ribbon, index) => {
          ribbon.visible = distance < 0.6
          ribbon.position.x = entrance.position.x
          ribbon.position.y = portrait ? 1 : 0
          ribbon.scale.x = portrait ? 1.25 : 2
          ribbon.rotation.y = elapsed * 0.05 + index * 0.1
        })
        panelGroups.forEach((group, index) => {
          group.position.x = (index % 2 === 0 ? 1.6 : -1.6) * (portrait ? 0.3 : 1)
          group.scale.setScalar(portrait ? 0.74 : 1)
          group.position.y = (portrait ? 1.3 : 0.45) + Math.sin(elapsed * 0.35 + index) * 0.06
          group.visible = distance > 0.35 && group.position.z - camera.position.z < -3
        })
        particleMaterial.uniforms.time.value = elapsed
        shards.rotation.z = Math.sin(elapsed * 0.05) * 0.015
        renderer.render(scene, camera)
        if (active && visible && !document.hidden) frame = requestAnimationFrame(render)
      }
      function requestRender() {
        if (!frame && visible && !document.hidden && !disposed && !contextLost) { previous = 0; frame = requestAnimationFrame(render) }
      }
      redraw.current = requestRender
      const resize = new ResizeObserver(() => {
        const { width, height } = element!.getBoundingClientRect()
        renderer.setSize(width, height); camera.aspect = width / Math.max(height, 1)
        portrait = camera.aspect < 1
        camera.updateProjectionMatrix(); requestRender()
      })
      resize.observe(element!)
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        if (visible) requestRender(); else { cancelAnimationFrame(frame); frame = 0 }
      })
      visibility.observe(element!)
      const onPointer = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || reduced.matches || !playing.current) return
        const box = element!.getBoundingClientRect()
        pointer.x = (event.clientX - box.left) / box.width - 0.5
        pointer.y = (event.clientY - box.top) / box.height - 0.5
        requestRender()
      }
      const resetPointer = () => { if (!playing.current) return; pointer.x = 0; pointer.y = 0; requestRender() }
      const raycaster = new T.Raycaster()
      const onClick = (event: MouseEvent) => {
        const box = element!.getBoundingClientRect()
        raycaster.setFromCamera(new T.Vector2((event.clientX - box.left) / box.width * 2 - 1, -(event.clientY - box.top) / box.height * 2 + 1), camera)
        const hit = raycaster.intersectObjects(panels)[0]
        if (hit) document.getElementById(`project-${hit.object.userData.projectId}`)?.scrollIntoView({ behavior: reduced.matches ? "instant" : "smooth" })
      }
      const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0 } else requestRender() }
      const onLost = (event: Event) => { event.preventDefault(); contextLost = true; cancelAnimationFrame(frame); frame = 0; setReady(false) }
      const onRestored = () => { contextLost = false; setReady(true); requestRender() }
      element!.addEventListener("pointermove", onPointer)
      element!.addEventListener("pointerleave", resetPointer)
      element!.addEventListener("click", onClick)
      renderer.domElement.addEventListener("webglcontextlost", onLost)
      renderer.domElement.addEventListener("webglcontextrestored", onRestored)
      window.addEventListener("scroll", requestRender, { passive: true })
      document.addEventListener("visibilitychange", onVisibility)
      reduced.addEventListener("change", requestRender)
      setReady(true); requestRender()
      cleanup = () => {
        cancelAnimationFrame(frame); resize.disconnect(); visibility.disconnect()
        element!.removeEventListener("pointermove", onPointer); element!.removeEventListener("pointerleave", resetPointer)
        element!.removeEventListener("click", onClick)
        renderer.domElement.removeEventListener("webglcontextlost", onLost); renderer.domElement.removeEventListener("webglcontextrestored", onRestored)
        window.removeEventListener("scroll", requestRender); document.removeEventListener("visibilitychange", onVisibility)
        reduced.removeEventListener("change", requestRender)
        geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose()); textures.forEach(texture => texture.dispose())
        shards.dispose(); environment.dispose(); renderer.dispose(); renderer.domElement.remove()
        redraw.current = () => {}
      }
    }
    void initialize().catch(() => { if (!disposed) setReady(false) })
    return () => { disposed = true; cleanup() }
  }, [progress])

  return <div className={`portfolio-world ${ready ? "world-ready" : ""} ${portraitReady ? "world-portrait-ready" : ""}`}>
    <div className="world-atmosphere" aria-hidden="true" />
    <div className="world-static-emblem"><Image src="/profile.jpg" alt="Nang Dalet, software developer" width={240} height={240} priority /></div>
    <div ref={host} className="world-canvas" role="img" aria-label="Immersive three-dimensional portfolio with Nang Dalet's portrait inside metallic rings, particles, and floating project previews" />
    <div className="world-vignette" aria-hidden="true" />
  </div>
}
