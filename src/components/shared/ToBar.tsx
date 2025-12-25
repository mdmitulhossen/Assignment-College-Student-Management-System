
interface TopBarProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const TopBar = ({ title, subtitle }: TopBarProps) => {
    // const { isDark, toggleDarkMode } = useDarkMode();
    return (
        <div className="flex items-center justify-between border-b bg-background px-8 py-4">
            <div>
                <h1 className="text-2xl font-bold text-teal-600">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-4">
                {/* <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button> */}
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white text-sm font-semibold">
                        A
                    </div>
                    <span className="text-sm font-medium">Admin</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;