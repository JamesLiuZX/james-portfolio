export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="font-display text-sm font-semibold tracking-tight">
            © {currentYear} James Liu
          </div>
          <div className="text-sm text-muted-foreground">
            Product Manager · Singapore
          </div>
        </div>
      </div>
    </footer>
  )
}
