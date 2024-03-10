import {VindVogelDoorUiterlijkController} from "../Controller/VindVogelDoorUiterlijkController";

export const VindVogelDoorUiterlijkRoutes = [{
    method: "post",
    route: "/getvogelsdooruiterlijk",
    controller: VindVogelDoorUiterlijkController,
    action: "getVogelsDoorUiterlijk"
}]