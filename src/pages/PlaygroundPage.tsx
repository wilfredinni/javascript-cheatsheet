import Seo from '../components/Seo'
import PlaygroundEditorPanel from '../components/playground/PlaygroundEditorPanel'
import PlaygroundHeader from '../components/playground/PlaygroundHeader'
import PlaygroundMobileTabs from '../components/playground/PlaygroundMobileTabs'
import PlaygroundOutputPanel from '../components/playground/PlaygroundOutputPanel'
import PlaygroundSplitHandle from '../components/playground/PlaygroundSplitHandle'
import { usePlaygroundRunner } from '../components/playground/usePlaygroundRunner'
import { useSplitResize } from '../components/playground/useSplitResize'
import { useTheme } from '../context/theme'
import { usePrerenderReady } from '../hooks/usePrerenderReady'

export default function PlaygroundPage() {
  const theme = useTheme()
  const {
    code,
    setCode,
    isRunning,
    filteredOutput,
    traceEvents,
    showVisualization,
    hasVisualization,
    visualizationStatus,
    outputFilters,
    activePane,
    setActivePane,
    shareLabel,
    savedLabel,
    lastRunLabel,
    lastRunDurationLabel,
    nodeOnlyReason,
    runDisabled,
    handleRun,
    handleFormat,
    handleShare,
    handleFilterToggle,
    handleVisualize,
    resetOutput,
    outputTypeClass,
    handleEditorBeforeMount,
    handleEditorMount,
  } = usePlaygroundRunner()
  const { splitPercent, splitContainerRef, isDragging, startDrag } =
    useSplitResize()

  usePrerenderReady(true)

  const editorTheme = theme.isDark ? 'playground-dark' : 'playground-light'

  return (
    <article className="h-[calc(100vh-3.6rem)] w-full bg-white dark:bg-zinc-900 overflow-hidden">
      <Seo
        title="JavaScript Playground"
        description="Write and execute JavaScript snippets instantly in your browser."
      />

      <section className="not-prose mx-auto flex h-full max-w-8xl flex-col px-3 pb-6 pt-4 sm:px-6 lg:px-12">
        <PlaygroundHeader
          savedLabel={savedLabel}
          shareLabel={shareLabel}
          onShare={handleShare}
        />

        {nodeOnlyReason ? (
          <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-200">
            Node-only example detected: {nodeOnlyReason}
          </p>
        ) : null}

        <PlaygroundMobileTabs
          activePane={activePane}
          onChange={setActivePane}
        />

        <div
          ref={splitContainerRef}
          className="mt-4 flex flex-col flex-1 min-h-0 min-w-0 gap-4 lg:grid"
          style={{
            gridTemplateColumns: `${splitPercent}fr 12px ${100 - splitPercent}fr`,
          }}
        >
          <PlaygroundEditorPanel
            activePane={activePane}
            code={code}
            isRunning={isRunning}
            lastRunLabel={lastRunLabel}
            lastRunDurationLabel={lastRunDurationLabel}
            runDisabled={runDisabled}
            nodeOnlyReason={nodeOnlyReason}
            onRun={handleRun}
            onVisualize={handleVisualize}
            onFormat={handleFormat}
            onEditorBeforeMount={handleEditorBeforeMount}
            onEditorMount={handleEditorMount}
            onCodeChange={setCode}
            theme={editorTheme}
          />

          <PlaygroundSplitHandle
            isDragging={isDragging}
            onPointerDown={startDrag}
          />

          <PlaygroundOutputPanel
            activePane={activePane}
            filteredOutput={filteredOutput}
            traceEvents={traceEvents}
            showVisualization={showVisualization}
            hasVisualization={hasVisualization}
            visualizationStatus={visualizationStatus}
            outputFilters={outputFilters}
            onFilterToggle={handleFilterToggle}
            onClear={resetOutput}
            outputTypeClass={outputTypeClass}
          />
        </div>
      </section>
    </article>
  )
}
