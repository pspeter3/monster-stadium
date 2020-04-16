import { h, FunctionComponent } from "preact";
import { el } from "./utils";
import { Monster } from "./core/bestiary";
import { PlusCircle } from "preact-feather";

const Root = el("section", ["flex", "px-1", "py-3"]);

const Add = el<HTMLButtonElement>("button", [
    "flex",
    "focus:outline-none",
    "focus:shadow-outline",
    "h-12",
    "hover:bg-teal-100",
    "items-center",
    "justify-center",
    "rounded-full",
    "text-teal-600",
    "w-12",
]);

const Container = el("div", ["px-3", "w-full", "sm:flex", "sm:items-center"]);

const Overview = el("header", ["flex-grow", "max-w-xs"]);

const Name = el("h3", ["text-gray-900", "font-semibold"]);

const Link = el<HTMLAnchorElement>("a", [
    "focus:outline-none focus:shadow-outline",
    "rounded",
]);

const Summary = el("em", ["text-gray-700"]);

const StatList = el("ul", ["flex"]);

const StatItem = el("li", ["flex", "w-16"]);

const StatLabel = el("abbr", ["text-teal-800", "font-bold", "no-underline"]);

const StatValue = el("span", ["text-gray-700", "px-2"]);

export interface Props {
    readonly monster: Monster;
    readonly onAdd: (id: string) => void;
}

export const MonsterTile: FunctionComponent<Props> = ({ monster, onAdd }) => (
    <Root>
        <Add
            onClick={() => onAdd(monster.id)}
            aria-label={`Add ${monster.name}`}
        >
            <PlusCircle />
        </Add>
        <Container>
            <Overview>
                <Name>
                    <Link href={`https://dndbeyond.com/monsters/${monster.id}`}>
                        {monster.name}
                    </Link>
                </Name>

                <Summary>
                    {monster.size} {monster.type}, {monster.alignment}
                </Summary>
            </Overview>
            <StatList>
                <StatItem class="mr-4">
                    <StatLabel title="Challenge Rating">CR</StatLabel>
                    <StatValue>
                        {monster.cr > 0 && monster.cr < 1
                            ? `1/${1 / monster.cr}`
                            : monster.cr}
                    </StatValue>
                </StatItem>
                <StatItem class="mr-4">
                    <StatLabel title="Hit Points">HP</StatLabel>
                    <StatValue>{monster.hp}</StatValue>
                </StatItem>
                <StatItem class="mr-4">
                    <StatLabel title="Armor Class">AC</StatLabel>
                    <StatValue>{monster.ac}</StatValue>
                </StatItem>
            </StatList>
        </Container>
    </Root>
);
