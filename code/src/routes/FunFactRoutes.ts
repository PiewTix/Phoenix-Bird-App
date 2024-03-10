import {FunFactsController} from "../Controller/FunFactsController";

export const FunFactRoutes = [{
    method: "get",
    route: "/funfact",
    controller: FunFactsController,
    action: "funfacts"
}]
