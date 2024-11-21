import { Checkbox } from '@/components/ui/checkbox'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from '@/components/ui/table'
import { cn } from '@/src/lib/utils'

export default function LoanTable() {
  return (
    <>
      <Table className={cn('rounded-lg bg-slate-300')}>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead className='w-[100px]'>Ref Code</TableHead>
            <TableHead>Effective Date</TableHead>
            <TableHead>Principal Loan</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Loan Type</TableHead>
            <TableHead>Borrower</TableHead>
            <TableHead>Loan Plan</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableCell className='font-medium'>INV001</TableCell>
            <TableCell>2024-01-01</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>3%</TableCell>
            <TableCell>Personal Loan</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>5 months</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableCell className='font-medium'>INV002</TableCell>
            <TableCell>2024-01-02</TableCell>
            <TableCell>$300.00</TableCell>
            <TableCell>5%</TableCell>
            <TableCell>Personal Loan</TableCell>
            <TableCell>Jane Doe</TableCell>
            <TableCell>3 months</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
