import { ContainerProps } from "@/src/types/container"


export default function PageContainer({children, className}: ContainerProps)
{
    return (
        <div className={`${className ?? ''} flex flex-col justify-center w-full p-8 mx-auto`}>
            {children}
        </div>
    )
}
