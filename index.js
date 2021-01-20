const inquirer = require("inquirer");
const fs = require("fs");
const { left } = require("inquirer/lib/utils/readline");

const CurrentDate = new Date();
const day = CurrentDate.getDate().toString();
let Day = String;
const month = CurrentDate.getMonth() + "1";
let Month = String;
const Year = CurrentDate.getFullYear();

if (month.length < 2) {
  Month = "0" + month;
} else {
  Month = month;
}
if (day.length < 2) {
  Day = "0" + day;
} else {
  Day = day;
}

const FormattedDate = Year + "-" + Month + "-" + Day;

let UserName = String;
let Client = String;
let ServerNum = Number;
let ServerInfo = [];
let SessionScheduled = String;

const GetServerInfo = async function (CurrentServer) {
  let ServerName = String;
  let ServerIp = String;
  let ServerPurpose = String;

  await inquirer
    .prompt([
      {
        type: "input",
        message: `What is the name of server number ${CurrentServer}?`,
        name: "ServerName",
      },
    ])
    .then((response) => {
      ServerName = response.ServerName;
    });
  await inquirer
    .prompt([
      {
        type: "input",
        message: `What is the IP address of server number ${CurrentServer}?`,
        name: "ServerIp",
      },
    ])
    .then((response) => {
      ServerIp = response.ServerIp;
    });
  await inquirer
    .prompt([
      {
        type: "input",
        message: `What is the purpose of server number ${CurrentServer}?`,
        name: "ServerPurpose",
      },
    ])
    .then((response) => {
      ServerPurpose = response.ServerPurpose;
    });

  let ServerInfoObj = {
    Name: ServerName,
    IP: ServerIp,
    Purpose: ServerPurpose,
  };

  ServerInfo.push(ServerInfoObj);

  return;
};

const forLoop = async function (ServerNum) {
  for (i = 0; i < ServerNum; i++) {
    await GetServerInfo(i + 1);
  }
};

const start = async function () {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "UserName",
      },
    ])
    .then((response) => {
      UserName = response.UserName;

      inquirer
        .prompt([
          {
            type: "input",
            message: "What client are you connecting to?",
            name: "Client",
          },
        ])
        .then((response) => {
          Client = response.Client;

          inquirer
            .prompt([
              {
                type: "input",
                message: "How many servers are you connecting to?",
                name: "ServerNum",
              },
            ])
            .then((response) => {
              ServerNum = response.ServerNum;

              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "What time is the connection scheduled for?",
                    name: "SessionScheduled",
                  },
                ])
                .then((response) => {
                  SessionScheduled = response.SessionScheduled;
                  forLoop(ServerNum).then(() => {
                    const FileName = FormattedDate + ".txt";
                    fs.writeFile("~/", FileName, function (err) {
                      if (err) {
                        return console.log(err);
                      } else {
                        console.log("Log Created.");
                      }
                      const Header = `
${UserName}
${FormattedDate}
${Client}
\n`;
                      fs.appendFile(FileName, Header, (err) => {
                        if (err) {
                          console.log(err);
                          return;
                        }
                      });
                      for (i = 0; i < ServerInfo.length; i++) {
                        const v = ServerInfo[i];
                        const ServName = `Server Name: ${v.Name}`;
                        const ServIp = `Server IP: ${v.IP}`;
                        const ServPurp = `Server Purpose: ${v.Purpose}`;
                        const ServerInfoText = `
    Server ${i + 1}
      ${ServName}
      ${ServIp}
      ${ServPurp} \n`;

                        fs.appendFile(FileName, ServerInfoText, (err) => {
                          if (err) {
                            console.log(err);
                            return;
                          }
                        });
                      }
                      const Tail = `
      Steps Taken:
      \n \n
      Scheduled Start Time: ${SessionScheduled}
      Actual Start Time:
      End Time:`;
                      fs.appendFile(FileName, Tail, (err) => {
                        if (err) {
                          console.log(err);
                          return;
                        }
                      });
                    });
                    return;
                  });
                });
            });
        });
    });
};

start();
