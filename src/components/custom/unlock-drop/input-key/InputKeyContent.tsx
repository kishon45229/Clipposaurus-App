import { InputKeyField } from "@/components/custom/unlock-drop/input-key/InputKeyField";
import { useUnlockDrop } from "@/contexts/UnlockDropContext";
import { useInputKeyVisibility } from "@/hooks/useInputCodeVisibility";

export const InputKeyContent = () => {
    const {
        identifier,
        systemSecret,
        userSecret,
        dropKeyVerificationRequestStatus,
        createDropRequestStatus,
        handleIdentifierChange,
        handleSystemSecretChange,
        handleUserSecretChange,
        handleKeyPress,
    } = useUnlockDrop();

    const {
        toggleIdentifierVisibility,
        toggleSystemSecretVisibility,
        toggleUserSecretVisibility,
        isIdentifierVisible,
        isSystemSecretVisible,
        isUserSecretVisible,
        setHoverIdentifier,
        setHoverSystemSecret,
        setHoverUserSecret,
    } = useInputKeyVisibility();

    const disabled =
        dropKeyVerificationRequestStatus === "verifying" ||
        createDropRequestStatus === "redirecting";

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)]">
                <InputKeyField
                    value={identifier}
                    onChange={handleIdentifierChange}
                    onKeyPress={handleKeyPress}
                    placeholder="apple"
                    show={isIdentifierVisible}
                    onToggle={toggleIdentifierVisibility}
                    onMouseEnter={() => setHoverIdentifier(true)}
                    onMouseLeave={() => setHoverIdentifier(false)}
                    disabled={disabled}
                />

                <span className="separator-classes">-</span>

                <InputKeyField
                    value={systemSecret}
                    onChange={handleSystemSecretChange}
                    onKeyPress={handleKeyPress}
                    placeholder="beer"
                    show={isSystemSecretVisible}
                    onToggle={toggleSystemSecretVisibility}
                    onMouseEnter={() => setHoverSystemSecret(true)}
                    onMouseLeave={() => setHoverSystemSecret(false)}
                    disabled={disabled}
                />

                <span className="separator-classes">-</span>

                <InputKeyField
                    value={userSecret}
                    onChange={handleUserSecretChange}
                    onKeyPress={handleKeyPress}
                    placeholder="beer"
                    show={isUserSecretVisible}
                    onToggle={toggleUserSecretVisibility}
                    onMouseEnter={() => setHoverUserSecret(true)}
                    onMouseLeave={() => setHoverUserSecret(false)}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};
