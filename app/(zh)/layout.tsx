import { createMetadata, SiteLayout } from '../site-layout';

export const metadata = createMetadata('zh');

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteLayout locale="zh">{children}</SiteLayout>;
}
