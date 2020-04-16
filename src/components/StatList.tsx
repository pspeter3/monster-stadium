import { h, FunctionComponent, Fragment } from "preact";

export const StatList: FunctionComponent<{
    stats: { id: string; title: string; value: number }[];
}> = ({ stats }) => (
    <dl class="hidden sm:block">
        {stats.map(({ id, title, value }) => (
            <Fragment key={id}>
                <dt class="inline-block w-8">
                    <abbr
                        class="dark:text-teal-600 font-bold leading-6 no-underline text-teal-700"
                        title={title}
                    >
                        {id}
                    </abbr>
                </dt>
                <dd class="dark:text-gray-500 inline-block leading-6 text-gray-700 w-12">
                    {value > 0 && value < 1 ? `1/${1 / value}` : value}
                </dd>
            </Fragment>
        ))}
    </dl>
);
