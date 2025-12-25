import { Button } from "@/components/ui/button"

// Example usage of the Button component with gradient primary variant

export function ButtonExamples() {
    return (
        <div className="flex flex-col gap-4 p-8">
            <h2 className="text-2xl font-bold mb-4">Button Variants</h2>

            {/* Gradient Primary Button */}
            <div>
                <h3 className="text-sm font-semibold mb-2">Primary Gradient Button</h3>
                <Button variant="primary">Primary Gradient Button</Button>
            </div>

            {/* Default Button */}
            <div>
                <h3 className="text-sm font-semibold mb-2">Default Button</h3>
                <Button variant="default">Default Button</Button>
            </div>

            {/* Other Variants */}
            <div className="flex gap-2">
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
            </div>

            {/* Different Sizes */}
            <div className="flex gap-2 items-center">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="default">Default</Button>
                <Button variant="primary" size="lg">Large</Button>
            </div>
        </div>
    )
}
