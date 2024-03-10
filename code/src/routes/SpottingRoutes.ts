import {SpottingController} from "../Controller/SpottingController";

export const SpottingRoutes = [{
    method: "get",
    route: "/spottings/:id",
    controller: SpottingController,
    action: "spottings"
},{
    method: "post",
    route: "/spottings",
    controller: SpottingController,
    action: "postspotting"
},{
    method: "get",
    route: "/latestdate/:id",
    controller: SpottingController,
    action: "getlatestdate"
}]
