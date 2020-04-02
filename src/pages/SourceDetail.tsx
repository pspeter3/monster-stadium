import { h, FunctionComponent } from "preact";

export const SourceDetail: FunctionComponent<{
    params: { id: string };
}> = ({ params }) => {
    const { id } = params;
    return <h1>{id}</h1>;
};
