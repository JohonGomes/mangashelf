// src/components/PlaceholderImage.tsx
import { Image as ImageIcon } from 'lucide-react';

export function PlaceholderImage() {
    return (
        <div className="w-full h-full bg-secondary flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-muted-foreground" />
        </div>
    );
}