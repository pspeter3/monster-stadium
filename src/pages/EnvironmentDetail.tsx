import { h, FunctionComponent } from "preact";

export const EnvironmentDetail: FunctionComponent<{
    params: { id: string };
}> = ({ params }) => {
    const { id } = params;
    return <h1>{id}</h1>;
};
