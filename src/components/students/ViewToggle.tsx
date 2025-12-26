import { Button } from '@/components/ui/button';
import { ViewMode } from '@/lib/types/student-list.types';
import { LayoutGrid, Table } from 'lucide-react';

interface ViewToggleProps {
    view: ViewMode;
    onChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
    return (
        <div className="flex items-center gap-1 border rounded-md p-1">
            <Button
                variant={view === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onChange('table')}
                className="h-8"
            >
                <Table className="h-4 w-4" />
            </Button>
            <Button
                variant={view === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onChange('card')}
                className="h-8"
            >
                <LayoutGrid className="h-4 w-4" />
            </Button>
        </div>
    );
}
