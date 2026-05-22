import { ReactNode } from "react"

export type HeadingProps =
{
    text?: string,
    children?: ReactNode
    className?: string,
    variants?: 'slide_topic_heading' | 'hero_heading_white' | 'hero_heading_green' | 'section_main_heading_green' | 'section_main_heading_white' | 'section_sub_heading_green' | 'section_sub_heading_white' | 'form_heading' | 'membership_card_heading' | 'location_card_heading' | 'form_heading' | 'dashboard_card_topic_heading' | 'membership_status_and_date_heading' | 'address_heading',
}