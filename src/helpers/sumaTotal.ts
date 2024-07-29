import { Referreal } from '@/interface/user';

interface Props {
  refers: Referreal[]
}

export const sumaTotal = ({refers}: Props) => {
  return refers.reduce((acc, refer) => acc + refer.mountPaid, 0)
}