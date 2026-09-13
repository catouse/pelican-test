import MyTests, { createMyTestsMetadata } from '../../../my-tests';

export const metadata = createMyTestsMetadata('en');

export default function Page() {
  return <MyTests locale="en" />;
}
