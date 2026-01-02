import React from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface InputKeyFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
    show: boolean;
    onToggle: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    disabled: boolean;
}

export const InputKeyField: React.FC<InputKeyFieldProps> = React.memo(({
    value,
    onChange,
    onKeyPress,
    placeholder,
    show,
    onToggle,
    onMouseEnter,
    onMouseLeave,
    disabled,
}) => (
    <div className="relative">
        <Input
            type={show ? "text" : "password"}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            className="py-4 border-zinc-800 text-sm xs:text-lg md:text-xl md:w-36 text-center cursor-text pr-5"
            maxLength={8}
            disabled={disabled}
        />
        <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            onClick={onToggle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            disabled={disabled}
            tabIndex={-1}
        >
            {show ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
        </button>
    </div>
));

InputKeyField.displayName = 'InputKeyField';