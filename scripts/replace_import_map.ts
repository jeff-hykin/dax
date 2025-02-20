import { FileSystem, glob } from "https://deno.land/x/quickr@0.7.4/main/file_system.js"
import { run, hasCommand, throwIfFails, zipInto, mergeInto, returnAsString, Timeout, Env, Cwd, Stdin, Stdout, Stderr, Out, Overwrite, AppendTo, } from "https://deno.land/x/quickr@0.7.4/main/run.js"
import { Console, clearAnsiStylesFrom, black, white, red, green, blue, yellow, cyan, magenta, lightBlack, lightWhite, lightRed, lightGreen, lightBlue, lightYellow, lightMagenta, lightCyan, blackBackground, whiteBackground, redBackground, greenBackground, blueBackground, yellowBackground, magentaBackground, cyanBackground, lightBlackBackground, lightRedBackground, lightGreenBackground, lightYellowBackground, lightBlueBackground, lightMagentaBackground, lightCyanBackground, lightWhiteBackground, bold, reset, dim, italic, underline, inverse, strikethrough, gray, grey, lightGray, lightGrey, grayBackground, greyBackground, lightGrayBackground, lightGreyBackground, } from "https://deno.land/x/quickr@0.7.4/main/console.js"
import $ from "https://esm.sh/jsr/@david/dax@0.42.0/mod.ts"
const $$ = (...args)=>$(...args).noThrow()

const imports = JSON.parse(FileSystem.read("deno.json")).imports

const files = await glob`**/*.{ts,js}`
for (const [key, value] of Object.entries(imports)) {
    await $$`sd ${JSON.stringify(key).slice(0,-1)} ${JSON.stringify(value).slice(0,-1)} ${files.join(" ")}`
}