import { useEffect, useState } from "preact/hooks";
import { NavigationService } from "../services/navigation";

export const useSearchParams = (
    navigation: NavigationService
): [URLSearchParams, (params: URLSearchParams) => void] => {
    const ctx = useState(new URLSearchParams(navigation.search()));
    const [params, setParams] = ctx;
    useEffect(() => navigation.pushState(`?${params.toString()}`), [
        navigation,
        params,
    ]);
    useEffect(
        () =>
            navigation.onChange(() =>
                setParams(new URLSearchParams(navigation.search()))
            ),
        [navigation]
    );
    return ctx;
};
