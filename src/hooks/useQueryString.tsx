import { useEffect, useState } from "preact/hooks";

export const useQueryString = (): [string, (search: string) => void] => {
    const ctx = useState(location.search);
    const [queryString, setQueryString] = ctx;
    useEffect(() => history.pushState(null, "", `?${queryString}`), [
        queryString,
    ]);
    useEffect(() => {
        const listener = () => setQueryString(location.search);
        window.addEventListener("popstate", listener);
        return () => window.removeEventListener("popstate", listener);
    }, []);
    return ctx;
};
