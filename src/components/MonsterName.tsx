import { h, FunctionComponent } from "preact";

export const MonsterName: FunctionComponent<{ id: string; name: string }> = ({
    id,
    name,
}) => (
    <h3 class="flex-grow">
        <a
            href={`https://dndbeyond.com/monsters/${id}`}
            class="dark:text-gray-300 dark:hover:text-teal-600 font-semibold focus:outline-none focus:shadow-outline hover:text-teal-700 leading-6 rounded text-gray-900"
        >
            {name}
        </a>
    </h3>
);
