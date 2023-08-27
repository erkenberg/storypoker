import React, { JSX } from 'react';
import UsernameWrapper from '@/app/table/[tableName]/components/username-wrapper';
import { getTableRow } from '@/lib/supabase/get-table-row';
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
  const tableRow = await getTableRow(tableName);
  if (!tableRow) {
    console.log('Table ' + tableName + " doesn't exist, redirecting");
    redirect('/?tableName=' + tableName);
  }

  return (
    <UsernameWrapper>
      <ClientPage tableName={tableName} initialTableState={tableRow} />
    </UsernameWrapper>
  );
};
export default Page;
