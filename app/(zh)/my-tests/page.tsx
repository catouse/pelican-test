import MyTests, { createMyTestsMetadata } from '../../my-tests';

export const metadata = createMyTestsMetadata('zh');

export default function Page() {
  return <MyTests locale="zh" />;
}
