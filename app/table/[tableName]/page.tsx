import React, { JSX } from 'react';
import { getTableState } from '@/lib/supabase/get-table-state';
import { redirect } from 'next/navigation';
import ClientPage from '@/app/table/[tableName]/client-page';

// Disable automatic NextJS fetch caching for this page to make sure the check whether a table exists is always fresh
export const revalidate = 0;

interface PageProps {
  params: Promise<{ tableName: string }>;
}

const Page = async ({ params }: PageProps): Promise<JSX.Element> => {
  const encodedTableName = (await params).tableName;
  const tableName = decodeURIComponent(encodedTableName);

  const tableState = await getTableState(tableName);
  if (!tableState) {
    console.log('Table ' + tableName + " doesn't exist, redirecting");
    redirect('/?tableName=' + tableName);
  }

  return <ClientPage tableName={tableName} initialTableState={tableState} />;
};
export default Page;
