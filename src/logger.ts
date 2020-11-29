/** Log management with colors */

const escape = "\x1b";

const colors = <const>[
  ...["black", "red", "green", "yellow"],
  ...["blue", "magenta", "cyan", "white"],
];
type ColorType = typeof colors[number];

const style = {
  mod: {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
  },
  text: colors.reduce(
    (acc, name, index) => ({
      ...acc,
      [name]: `${escape}[3${index}m`,
    }),
    {} as { [key in ColorType]: string }
  ),
  bg: colors.reduce(
    (acc, name, index) => ({
      ...acc,
      [name]: `${escape}[4${index}m`,
    }),
    {} as { [key in ColorType]: string }
  ),
};

export const color = (
  text: string,
  color: ColorType,
  mod?: keyof typeof style.mod
) => style.text[color] + (mod ? style.mod[mod] : "") + text + style.mod.reset;

const tag = color("[sybury]", "cyan");
const timeLabel = tag + " time";

export const log = (...args: any[]) => {
  console.log(tag, ...args);
};

export const startProcess = () => {
  console.time(timeLabel);
  console.clear();
  log(color("Welcome to CLI", "cyan", "bold"));
};

export const endProcess = () => {
  console.timeEnd(timeLabel);
  process.exit(0);
};
