import { CustomerPayload } from "./Customer.dto";
import { VendorPayload } from "./Vender.dto";

export type AuthPayload = VendorPayload | CustomerPayload;
