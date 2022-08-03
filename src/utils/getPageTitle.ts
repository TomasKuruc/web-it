export const getPageTitle = (pathname: string): string => {
    switch (pathname) {
        case "/fileDetail":
            return "File Detail";
        case "/":
            return "Dashboard";
        case "/files":
            return "Files";
        default:
            return "Default Page";
    }
}