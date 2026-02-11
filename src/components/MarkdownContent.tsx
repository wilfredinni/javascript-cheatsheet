import parse, { domToReact, Element, type DOMNode } from 'html-react-parser'
import CodeBlock from './CodeBlock'

type MarkdownContentProps = {
  html: string
}

function isElement(node: DOMNode): node is Element {
  return node.type === 'tag'
}

function getTextFromNodes(nodes: DOMNode[]): string {
  return nodes
    .map((node) => {
      if (node.type === 'text') {
        return node.data || ''
      }

      if (isElement(node) && node.children) {
        return getTextFromNodes(node.children as DOMNode[])
      }

      return ''
    })
    .join('')
}

function extractLanguage(className: string | undefined) {
  if (!className) {
    return undefined
  }

  const match = className.match(/language-([\w-]+)/)
  return match ? match[1] : undefined
}

export default function MarkdownContent({ html }: MarkdownContentProps) {
  return parse(html, {
    replace(node) {
      if (!isElement(node) || node.name !== 'pre') {
        return undefined
      }

      const children = node.children as DOMNode[]
      const codeElement = children.find(
        (child) => isElement(child) && child.name === 'code',
      ) as Element | undefined

      if (!codeElement) {
        return undefined
      }

      const preClassName = node.attribs?.class
      const codeClassName = codeElement.attribs?.class
      const runnable =
        node.attribs?.['data-run'] === 'true' ||
        codeElement.attribs?.['data-run'] === 'true'
      const fileName =
        node.attribs?.['data-file'] || codeElement.attribs?.['data-file']
      const code = getTextFromNodes((codeElement.children || []) as DOMNode[])
      const language = extractLanguage(codeClassName)

      return (
        <CodeBlock
          code={code}
          language={language}
          preClassName={preClassName}
          codeClassName={codeClassName}
          runnable={runnable}
          fileName={fileName}
        >
          {domToReact(codeElement.children as DOMNode[])}
        </CodeBlock>
      )
    },
  })
}
