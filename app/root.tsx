import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import './tailwind.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#fff9fc" />
        <title>沼落ち認定証</title>
        <meta name="description" content="あの日の「ハマらない」と、いまの熱狂を並べて楽しむ沼落ち記録アプリ" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body>{children}<ScrollRestoration /><Scripts /></body>
    </html>
  )
}

export default function App() { return <Outlet /> }
