import DaoDapp from '@/components/DaoDapp';

type Props = {}

export default function Dapp(props: Props) {

  return (
    <div className='w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600'>
      <DaoDapp />
    </div>
  )
}