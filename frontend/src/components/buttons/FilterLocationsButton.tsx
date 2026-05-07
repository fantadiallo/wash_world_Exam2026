'use client'
import { useState } from "react";
import Button from "./Button";
import { ButtonProps } from "@/src/types/button";


export default function FilterLocationsButton({text, className, children, variant}: ButtonProps)
{
    

    return (
        <Button className="text-(--solid-black) px-2 py-2 rounded-md cursor-pointer hover:bg-(--brand-green-white-bg) hover:text-(--solid-white)"
        >
            {text}
            {children}
        </Button>
    )
}
