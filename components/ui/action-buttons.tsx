import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onEdit: () => void
  onDelete: () => void
}

export function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
  return (
    <div className="flex space-x-2">
      <Button variant="ghost" size="icon" onClick={onEdit}>
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={onDelete}>
        <Trash className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  )
}