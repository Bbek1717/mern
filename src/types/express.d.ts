import { Payload } from "./global.type";

declare global {
    namespace Express{
        interface Request{
            user : Payload
        }
    }
}