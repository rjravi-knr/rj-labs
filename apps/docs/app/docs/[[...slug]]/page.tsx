export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const title = slug?.slice(-1)[0] ?? "Introduction"

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight capitalize">
          {title.replace(/-/g, " ")}
        </h1>
        <p className="text-lg text-muted-foreground">
          Documentation for {title}. This is a placeholder page.
        </p>
      </div>
      <div className="pb-12 pt-8">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          This page is dynamically generated based on the URL slug: <code>{JSON.stringify(slug)}</code>
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          In a real application, this would fetch MDX content from the file system or a CMS.
        </p>
      </div>
    </div>
  )
}
