export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-6 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">© {currentYear} JAMES LIU</div>
          <div className="text-sm text-muted-foreground mt-2 md:mt-0">Made with Next.js & Tailwind</div>
        </div>
      </div>
    </footer>
  )
}

