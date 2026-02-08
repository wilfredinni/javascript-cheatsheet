import BaseBadgeSecondary from './BaseBadgeSecondary'
import { useReader } from '../../context/reader'

export default function BaseReaderMode() {
  const reader = useReader()

  return (
    <button onClick={reader.toggle}>
      <BaseBadgeSecondary>Enter reader mode</BaseBadgeSecondary>
    </button>
  )
}
