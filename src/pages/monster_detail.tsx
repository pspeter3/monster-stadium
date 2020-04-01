import { h, FunctionComponent } from "preact";

export const MonsterDetail: FunctionComponent<{
    params: { source: string; id: string };
}> = ({ params }) => {
    const { source, id } = params;
    return (
        <h1>
            {source} {id}
        </h1>
    );
};
