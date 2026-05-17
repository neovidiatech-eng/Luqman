import DeveloperProfile from '@/pages/admin/DeveloperProfile'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return <DeveloperProfile id={resolvedParams.id} />
}
