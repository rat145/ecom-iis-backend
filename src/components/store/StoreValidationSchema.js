import { emailSchema, nameSchema, phoneSchema } from "../../utils/validation/ValidationSchemas";

export const StoreValidationSchema = {
    store_name: nameSchema,
    description: nameSchema,
    country_id: nameSchema,
    state_id: nameSchema,
    city: nameSchema,
    address: nameSchema,
    pincode: nameSchema,
    name: nameSchema,
    email: emailSchema,
    // store_logo_id: nameSchema,
    phone: phoneSchema,
}