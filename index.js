const inquirer = require("inquirer");

const CurrentDate = new Date();
const Day = CurrentDate.getDate();
const Month = CurrentDate.getMonth();
const Year = CurrentDate.getFullYear();
const FormattedDate = Year + "/" + Month + "/" + Day;

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
              let ServerPurpose = response.ServerPurpose;
            });

              let ServerInfoObj = {
                Name: ServerName,
                IP: ServerIp,
                Purpose: ServerPurpose,
              };

              ServerInfo.push(ServerInfoObj);

              return;
            }

const forLoop = async function (ServerNum) {
    for (i=0; i<ServerNum; i++){
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
                    console.log(UserName + '\n' + Client + '\n' + ServerInfo + '\n' + SessionScheduled);
                    return;
                  });
                });
            });
        });
    });
};

start()
