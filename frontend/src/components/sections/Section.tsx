import { SectionProps } from "@/src/types/section"

const variants = {
    hero: 'relative h-[70vh] overflow-hidden',
    page: 'h-fit mt-4',
    profile_hero: 'flex gap-4 items-center text-white',
    profile_information: 'flex flex-col items-center gap-8 mt-4',
}

export default function Section({
    children,
    variant,
    className = ''
}: SectionProps)
{
    const styles = `${variants[variant]} ${className}`

    return (
        <section className={styles}>
            {children}
        </section>
    )    
};