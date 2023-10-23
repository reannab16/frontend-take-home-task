import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function CreateInvoicePage() {
    return(
        <main className="flex min-h-screen flex-col items-start justify-start pt-20 container gap-y-8">
            <div className="flex items-center justify-center text-[var(--emeraldGreen)]">
                <ArrowBackIosIcon className="text-base"/>
                <div className="text-base">Back</div>
            </div>
        </main>
    )
}