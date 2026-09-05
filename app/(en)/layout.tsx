import { createMetadata, SiteLayout } from '../site-layout';

export const metadata = createMetadata('en');

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
