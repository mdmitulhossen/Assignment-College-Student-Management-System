import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileQuestion, Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background via-background to-muted/20">
            <div className="w-full max-w-3xl">
                <Card className="border-2 shadow-2xl overflow-hidden">
                    <CardContent className="p-0">
                        {/* Header Section with Background Pattern */}
                        <div className="relative bg-linear-to-br from-primary/10 via-primary/5 to-background p-12 sm:p-16 border-b">
                            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                            <div className="relative flex flex-col items-center text-center space-y-6">
                                {/* Animated Icon */}
                                <div className="relative animate-bounce-slow">
                                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                                    <div className="relative bg-primary/10 p-8 rounded-full border-2 border-primary/20">
                                        <FileQuestion className="h-20 w-20 text-primary" strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Error Code with Gradient */}
                                <div className="space-y-3">
                                    <h1 className="text-8xl sm:text-9xl font-black bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                                        404
                                    </h1>
                                    <div className="flex items-center gap-2 justify-center">
                                        <div className="h-0.5 w-12 bg-linear-to-r from-transparent to-primary" />
                                        <div className="h-1 w-1 rounded-full bg-primary" />
                                        <div className="h-0.5 w-12 bg-linear-to-l from-transparent to-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 sm:p-12 space-y-8">
                            {/* Main Message */}
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                                    Page Not Found
                                </h2>
                                <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                                    Oops! The page you&apos;re looking for seems to have wandered off.
                                    It might have been moved, deleted, or perhaps it never existed.
                                </p>
                            </div>

                            {/* Info Box */}
                            <div className="bg-muted/50 border border-border rounded-lg p-6">
                                <div className="flex items-start gap-3">
                                    <Search className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-foreground">
                                            What you can do:
                                        </h3>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                                                Check the URL for any typos or errors
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                                                Return to the homepage and navigate from there
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                                                Use the navigation menu to find what you need
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link href="/" className="w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8"
                                    >
                                        <Home className="h-5 w-5" />
                                        Go to Dashboard
                                    </Button>
                                </Link>
                                <Link href="/students" className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto gap-2 border-2 hover:bg-primary/5 transition-all duration-300 text-base px-8"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                        View Students
                                    </Button>
                                </Link>
                            </div>

                            {/* Footer Note */}
                            <div className="text-center pt-4 border-t">
                                <p className="text-sm text-muted-foreground">
                                    If you believe this is an error, please contact the system administrator
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
