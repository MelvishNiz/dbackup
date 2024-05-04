import dayjs from "dayjs";
import {exec} from "child_process";

interface Credential {
  host: string;
  port: number;
  username: string;
  password: string;
  database_name: string;
}

export const usePostgresql = (credential: Credential) => {
  exec(generateCommand(credential), (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Backup successful.`);
  });
  return ref();
};

const generateCommand = (credential: Credential) => {
  const path = `dbackup-${credential.database_name}-${dayjs().format("DD.MM.YYY_HH-mm-ss")}.sql`;
  return `PGPASSWORD=${credential.password} pg_dump -h ${credential.host} -p ${credential.port} -U ${credential.username} -Fc -d ${credential.database_name} > ${path}`;
};
