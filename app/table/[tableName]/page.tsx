import React, { JSX } from 'react';
import UsernameWrapper from '@/app/table/[tableName]/components/username-wrapper';
import { getTableState } from '@/lib/supabase/table-state';
import { redirect } from 'next/navigation';
import ClientPage from '@/app/table/[tableName]/client-page';

// Disable automatic NextJS fetch caching for this page to make sure the check whether a table exists is always fresh
export const revalidate = 0;

interface PageProps {
  params: { tableName: string };
}

const Page = async ({
  params: { tableName },
}: PageProps): Promise<JSX.Element> => {
  const tableState = await getTableState(tableName);
  if (!tableState) {
    console.log('Table ' + tableName + " doesn't exist, redirecting");
    redirect('/?tableName=' + tableName);
  }

  return (
    <UsernameWrapper>
      <ClientPage tableName={tableName} initialTableState={tableState} />
    </UsernameWrapper>
  );
};
export default Page;
