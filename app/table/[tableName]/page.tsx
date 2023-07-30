import React, { JSX } from 'react';
import UsernameWrapper from '@/app/table/[tableName]/username-wrapper';
import { getTableData } from '@/lib/supabase/get-table-data';
import { redirect } from 'next/navigation';
import ClientPage from '@/app/table/[tableName]/client-page';

// Disable automatic nextjs fetch caching for this page to make sure it the check whether a table exists is always fresh
export const revalidate = 0;

interface PageProps {
  params: { tableName: string };
}

const Page = async ({
  params: { tableName },
}: PageProps): Promise<JSX.Element> => {
  const tableData = await getTableData(tableName);
  if (!tableData) {
    console.log('Table ' + tableName + " doesn't exist, redirecting");
    redirect('/?tableName=' + tableName);
  }
  return (
    <UsernameWrapper>
      <ClientPage tableData={tableData} />
    </UsernameWrapper>
  );
};
export default Page;
