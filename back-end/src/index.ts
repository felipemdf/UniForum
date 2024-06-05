import SetupServer from "./server";
import configApp from "./core/config/env.config";

const server: SetupServer = new SetupServer(configApp);
server.start();
