'use client'
import { useState } from "react";
import Button from "./Button";
import { ButtonProps, FilterLocationButtonProps} from "@/src/types/button";


export default function FilterLocationsButton({text, className, children, variant, onFilterChange, filterValue, isActive}: ButtonProps & FilterLocationButtonProps)
{
    return (
        <Button className={`${isActive ? 'bg-(--brand-green-white-bg) text-(--solid-white)' : 'bg-transparent text-(--solid-black)'} text-(--solid-black) px-2 py-2 rounded-md cursor-pointer hover:bg-(--brand-green-white-bg) hover:text-(--solid-white)`}
           onClick={() => {onFilterChange(filterValue)}}
        >
            {text}
            {children}
        </Button>
    )
}
