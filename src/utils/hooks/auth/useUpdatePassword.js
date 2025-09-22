
import { passwordConfirmationSchema, passwordSchema, YupObject } from "../../validation/ValidationSchemas";

export const UpdatePasswordSchema = YupObject({ password: passwordSchema, password_confirmation: passwordConfirmationSchema });

