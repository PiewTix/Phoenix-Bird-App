import { VogelController } from "../controller/VogelController";

export const VogelRoutes = [{
    method: "get",
    route: "/vogels",
    controller: VogelController,
    action: "vogels"
},{
    method: "get",
    route:"/vogels/:id",
    controller: VogelController,
    action: "one"
}]

