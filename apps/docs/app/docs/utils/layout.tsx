import { DocsNavigation } from "../../components/docs-navigation"

export default function UtilsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
      <DocsNavigation />
    </div>
  )
}
