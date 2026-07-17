import { buildGraph } from '@/lib/schema';

// Renders one or more JSON-LD nodes as a single @graph script. A server
// component, so it lands in the server-rendered HTML for crawlers that do not
// execute JavaScript.
export default function JsonLd({ nodes }: { nodes: Record<string, unknown>[] }) {
  const graph = buildGraph(nodes);
  return (
    <script
      type="application/ld+json"
      // Injecting a stringified, non-user-controlled JSON-LD object.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
