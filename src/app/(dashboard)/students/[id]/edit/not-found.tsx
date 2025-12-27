import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] p-4">
            <Card className="w-full max-w-2xl border-destructive/50 shadow-lg">
                <CardContent className="pt-12 pb-10 px-6 sm:px-12">
                    <div className="flex flex-col items-center text-center space-y-6">
                        {/* Icon */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-destructive/10 blur-3xl rounded-full" />
                            <div className="relative bg-destructive/10 p-6 rounded-full">
                                <AlertCircle className="h-16 w-16 text-destructive" strokeWidth={1.5} />
                            </div>
                        </div>

                        {/* Error Code */}
                        <div className="space-y-2">
                            <h1 className="text-6xl sm:text-7xl font-bold text-destructive/90">
                                404
                            </h1>
                            <div className="h-1 w-24 bg-linear-to-r from-transparent via-destructive/50 to-transparent mx-auto" />
                        </div>

                        {/* Message */}
                        <div className="space-y-3 max-w-md">
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                                Student Not Found
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The student record you&apos;re trying to access doesn&apos;t exist or may have been removed from the system.
                            </p>
                        </div>

                        {/* Suggestions */}
                        <div className="w-full pt-4">
                            <div className="bg-muted/30 rounded-lg p-4 mb-6">
                                <p className="text-sm text-muted-foreground">
                                    <strong className="text-foreground">Possible reasons:</strong>
                                </p>
                                <ul className="text-sm text-muted-foreground mt-2 space-y-1 text-left list-disc list-inside">
                                    <li>The student ID is incorrect or invalid</li>
                                    <li>The student record has been deleted</li>
                                    <li>You don&apos;t have permission to view this student</li>
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/students" className="w-full sm:w-auto">
                                    <Button
                                        variant="default"
                                        className="w-full sm:w-auto gap-2 shadow-md hover:shadow-lg transition-all"
                                        size="lg"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Students
                                    </Button>
                                </Link>
                                <Link href="/students/new" className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto gap-2 hover:bg-primary/5 transition-all"
                                        size="lg"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                        Add New Student
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Help Text */}
                        <p className="text-xs text-muted-foreground pt-2">
                            Need help? Contact your system administrator
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
