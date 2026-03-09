import { Resend } from "resend";
import { keys } from "./keys";

const { RESEND_TOKEN } = keys();

export const resend = RESEND_TOKEN ? new Resend(RESEND_TOKEN) : undefined;
