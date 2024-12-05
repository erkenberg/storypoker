import React, { JSX } from 'react';
import UsernameWrapper from '@/app/table/[tableName]/components/username-wrapper';
import { getTableState } from '@/lib/supabase/table-state';
import { redirect } from 'next/navigation';
import ClientPage from '@/app/table/[tableName]/client-page';

interface PageProps {
  params: Promise<{ tableName: string }>;
}

const Page = async ({ params }: PageProps): Promise<JSX.Element> => {
  const { tableName } = await params;

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
