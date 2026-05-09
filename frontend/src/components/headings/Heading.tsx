import { HeadingProps } from "@/src/types/heading"

const variants = {
    slide_topic_heading: 'font-gilroy font-bold slide-topic text-lg text-(--brand-green-dark-bg) tracking-widest uppercase',
    slide_main_heading: 'font-gilroy text-(--solid-white) text-2xl font-bold leading-tight mb-2',
    hero_heading_white: 'text-(--solid-white) text-5xl md:text-7xl leading-none font-bold',
    hero_heading_green: 'text-(--brand-green-dark-bg) text-5xl md:text-7xl leading-none font-bold',
    section_main_heading_green: 'text-(--brand-green-white-bg) text-4xl md:text-6xl leading-tight',
    section_main_heading_white: 'text-(--solid-white) text-4xl md:text-6xl leading-tight',
    section_sub_heading_green: 'text-xl uppercase text-(--brand-green-dark-bg) mb-2',
    section_sub_heading_white: 'relative text-(--solid-white) font-bold inline-flex items-center gap-2 border-b border-(--solid-white)',
    membership_card_heading: 'text-(--brand-green-white-bg) text-3xl font-bold uppercase',
    location_card_heading: 'text-(--brand-green-dark-bg) text-xl',
    form_heading: 'text-4xl font-bold mb-2 text-(--brand-green-white-bg)',
    dashboard_card_topic_heading: 'font-gilroy font-bold slide-topic text-lg text-(--brand-green-dark-bg) tracking-wide uppercase',
    membership_status_and_date_heading: 'text-(--splash-orange) membership-type mb-3 text-2xl',
    address_heading: 'text-(--brand-green-white-bg)',
}

export default function Heading({ text, children, className = '', variant = '' }: HeadingProps)
{
    const styles = `${variants[variant]} ${className}`
    return (
        <header className={styles}>
            {text}
            {children}
        </header>
    )   
}