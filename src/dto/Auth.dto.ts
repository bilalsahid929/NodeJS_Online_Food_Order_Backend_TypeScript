import { CustomerPayload } from "./Customer.dto";
import { VandorPayload } from "./Vender.dto";

export type AuthPayload = VandorPayload | CustomerPayload;
