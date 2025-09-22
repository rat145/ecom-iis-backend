import { emailSchema, YupObject } from "../../validation/ValidationSchemas";

export const ForgotPasswordSchema = YupObject({ email: emailSchema });
