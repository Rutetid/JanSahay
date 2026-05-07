import { ArrowRight, BrainCircuit, Database, FileJson, Gauge, GitBranch, Layers3, Network, Server, Sparkles, Waypoints } from 'lucide-react'
import { motion as Motion } from 'motion/react'

const TechnicalShowcase = ({ language }) => {
  const content = {
    en: {
      eyebrow: 'Technical build',
      title: 'Built as a full-stack RAG system, not a static demo',
      subtitle: 'JanSahay combines a React product interface with an Express API layer and a Python retrieval service for semantic welfare-scheme matching.',
      metrics: [
        { label: 'Retrieval Layer', value: 'FAISS', detail: 'Vector similarity search', icon: Database },
        { label: 'Knowledge Base', value: '45+', detail: 'Indexed welfare schemes', icon: FileJson },
        { label: 'API Stack', value: 'Express + FastAPI', detail: 'Separate backend and RAG service', icon: Server },
        { label: 'Frontend', value: 'React + Vite', detail: 'Responsive Tailwind interface', icon: Gauge },
      ],
      architectureTitle: 'RAG Architecture',
      architectureSubtitle: 'The matching flow converts user profile data into a retrieval query, searches the vector index, then returns ranked scheme context for recommendation.',
      flow: [
        { title: 'Citizen Profile', detail: 'Age, income, state, category, residence and occupation', icon: Layers3 },
        { title: 'Sentence Embeddings', detail: 'Profile intent is represented as semantic vectors', icon: BrainCircuit },
        { title: 'FAISS Retrieval', detail: 'Nearest scheme chunks are selected from the vector index', icon: Database },
        { title: 'Context Assembly', detail: 'Eligibility, documents and benefits are prepared for the response', icon: GitBranch },
        { title: 'Recommendation UI', detail: 'Ranked schemes are shown with explainable details', icon: Sparkles },
      ],
    },
    hi: {
      eyebrow: 'तकनीकी निर्माण',
      title: 'एक full-stack RAG system के रूप में बनाया गया, सिर्फ static demo नहीं',
      subtitle: 'जनसहाय React interface, Express API layer और Python retrieval service को जोड़कर semantic welfare-scheme matching करता है।',
      metrics: [
        { label: 'Retrieval Layer', value: 'FAISS', detail: 'Vector similarity search', icon: Database },
        { label: 'Knowledge Base', value: '45+', detail: 'Indexed welfare schemes', icon: FileJson },
        { label: 'API Stack', value: 'Express + FastAPI', detail: 'Separate backend and RAG service', icon: Server },
        { label: 'Frontend', value: 'React + Vite', detail: 'Responsive Tailwind interface', icon: Gauge },
      ],
      architectureTitle: 'RAG Architecture',
      architectureSubtitle: 'Matching flow user profile data को retrieval query में बदलता है, vector index search करता है और recommendation के लिए ranked scheme context लौटाता है।',
      flow: [
        { title: 'Citizen Profile', detail: 'Age, income, state, category, residence and occupation', icon: Layers3 },
        { title: 'Sentence Embeddings', detail: 'Profile intent semantic vectors में represent होता है', icon: BrainCircuit },
        { title: 'FAISS Retrieval', detail: 'Vector index से nearest scheme chunks चुने जाते हैं', icon: Database },
        { title: 'Context Assembly', detail: 'Eligibility, documents और benefits response के लिए तैयार होते हैं', icon: GitBranch },
        { title: 'Recommendation UI', detail: 'Ranked schemes explainable details के साथ दिखते हैं', icon: Sparkles },
      ],
    },
  }

  const c = content[language] || content.en

  return (
    <section id="tech-stack" className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-black/16 py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
              <Waypoints className="h-3.5 w-3.5 text-emerald-300" />
              {c.eyebrow}
            </div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              {c.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-50/65 sm:text-base">
              {c.subtitle}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {c.metrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <div key={metric.label} className="rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
                    <Icon className="mb-4 h-5 w-5 text-emerald-300" />
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-50/40">{metric.label}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{metric.value}</p>
                    <p className="mt-1 text-xs leading-5 text-emerald-50/55">{metric.detail}</p>
                  </div>
                )
              })}
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
            className="rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-[0_28px_110px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-5"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-black/20 px-2.5 py-1 text-xs text-emerald-100/70">
                  <Network className="h-3.5 w-3.5 text-emerald-300" />
                  RAG pipeline
                </div>
                <h3 className="text-2xl font-semibold text-white">{c.architectureTitle}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/60">{c.architectureSubtitle}</p>
              </div>
            </div>

            <div className="grid gap-3">
              {c.flow.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="grid gap-3 sm:grid-cols-[1fr_36px_1fr] sm:items-center">
                    <div className="rounded-md border border-white/10 bg-black/20 p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-emerald-300/10">
                        <Icon className="h-5 w-5 text-emerald-300" />
                      </div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm leading-5 text-emerald-50/58">{step.detail}</p>
                    </div>
                    {index < c.flow.length - 1 && (
                      <div className="hidden justify-center text-emerald-300/70 sm:flex">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                    {index < c.flow.length - 1 && (
                      <div className="hidden sm:block">
                        <div className="h-px w-full bg-gradient-to-r from-emerald-300/45 to-transparent" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default TechnicalShowcase
