import React from "react";

export const AmbientGlow = React.memo(() => {
    return (
        <div className="
            absolute inset-0 pointer-events-none rounded-2xl
        ">
            <div className="
            absolute inset-0
            bg-emerald-500 /5
    blur - 2xl
        ">
            </div>
        </div>
    );
});

AmbientGlow.displayName = "AmbientGlow";