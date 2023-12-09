import AdManager from '@/components/AdManager';

type Props = {}

export default function Page(props: Props) {

  return (
     
    <div className='bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600'>
      <AdManager />
    </div>
  )
}