import { ContainerProps } from "@/src/types/container"


export default function PageContainer({children, className}: ContainerProps)
{
    return (
        <div className={`${className ?? ''} flex flex-col justify-center gap-6 w-full max-w-[800px] p-8 mx-auto`}>
            {children}
        </div>
    )
}
