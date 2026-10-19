"use client"

import { useEffect, useRef } from "react"

const snippets = [
  [
    'const scene = new THREE.Scene()',
    'const camera = new PerspectiveCamera(55)',
    'scene.add(new AmbientLight(0x71a4d8))',
    '',
    'function render(time) {',
    '  const delta = clock.getDelta()',
    '  camera.position.z = 10 - distance * 8',
    '  renderer.render(scene, camera)',
    '  requestAnimationFrame(render)',
    '}',
    '',
    'const pointer = { x: 0, y: 0 }',
    'const damping = 1 - Math.exp(-delta * 9)',
  ],
  [
    '@RestController',
    '@RequestMapping("/api/projects")',
    'public class ProjectController {',
    '  private final ProjectService service;',
    '',
    '  @GetMapping',
    '  public List<Project> findAll() {',
    '    return service.findAll();',
    '  }',
    '}',
    '',
    'SELECT title, category, year',
    'FROM projects',
    'ORDER BY year DESC;',
  ],
  [
    'export default function Portfolio() {',
    '  const [project, setProject] = useState(0)',
    '  return (',
    '    <main>',
    '      <PortfolioWorld />',
    '      <Projects items={projects} />',
    '      <Contact />',
    '    </main>',
    '  )',
    '}',
    '',
    'git add .',
    'git commit -m "Build something useful"',
  ],
]

export default function CodeBackground({ paused }: { paused: boolean }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return
    let visible = false
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      element.dataset.running = String(visible && !document.hidden && !paused && !reduced.matches)
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() })
    observer.observe(element)
    document.addEventListener("visibilitychange", update)
    reduced.addEventListener("change", update)
    update()
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", update)
      reduced.removeEventListener("change", update)
    }
  }, [paused])

  return <div ref={root} className="code-background" aria-hidden="true" data-running="false">
    {snippets.map((lines, index) => <div className="code-background-column" key={index}>
      <div className="code-background-track">
        {[0, 1].map(copy => <pre key={copy}><code>{lines.map((line, lineIndex) =>
          <span className="code-background-line" key={lineIndex}>
            {line.split(/("[^"]*"|\b(?:const|new|function|return|export|default|public|class|private|final|SELECT|FROM|ORDER BY)\b|@\w+)/g).map((token, tokenIndex) =>
              <span key={tokenIndex} className={token.startsWith('"') ? "code-string" : /^(const|new|function|return|export|default|public|class|private|final|SELECT|FROM|ORDER BY|@)/.test(token) ? "code-keyword" : undefined}>{token}</span>
            )}
          </span>
        )}</code></pre>)}
      </div>
    </div>)}
  </div>
}
