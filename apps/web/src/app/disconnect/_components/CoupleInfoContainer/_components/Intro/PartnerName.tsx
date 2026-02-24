import { getMyPageServer } from '@repo/api-client';

export default async function PartnerName() {
  const data = await getMyPageServer();
  return <>{data.partnerName ?? '상대방'}</>;
}
