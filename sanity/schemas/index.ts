import { caseStudy } from "@/sanity/schemas/caseStudy";
import { contactConfig } from "@/sanity/schemas/contactConfig";
import { faq } from "@/sanity/schemas/faq";
import { footer } from "@/sanity/schemas/footer";
import { navigation } from "@/sanity/schemas/navigation";
import { packageType } from "@/sanity/schemas/package";
import { post } from "@/sanity/schemas/post";
import { service } from "@/sanity/schemas/service";
import { siteSettings } from "@/sanity/schemas/siteSettings";
import { teamMember } from "@/sanity/schemas/teamMember";
import { testimonial } from "@/sanity/schemas/testimonial";

export const schemaTypes = [siteSettings, navigation, footer, service, packageType, testimonial, caseStudy, post, faq, teamMember, contactConfig];
