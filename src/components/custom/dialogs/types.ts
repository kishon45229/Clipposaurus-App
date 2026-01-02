import React from "react";

export interface BaseDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** Custom content to render in the dialog body */
  children?: React.ReactNode;
}

export interface BaseDialogContentProps {
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom content */
  children: React.ReactNode;
}

export interface BaseDialogBodyProps {
  /** Icon to display at the top */
  icon: React.ReactElement;
  /** Dialog title */
  title: string;
  /** Dialog description */
  description: string;
  /** Custom content to render between description and buttons */
  children?: React.ReactNode;
}

export interface BaseDialogActionsProps {
  /** Array of button configurations */
  buttons?: DialogButtonProps[];
  /** Custom button content */
  children?: React.ReactNode;
}

export interface DialogButtonProps {
  /** Button text */
  text: string;
  /** Button click handler */
  onClick: () => void;
  /** Button variant */
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  /** Button size */
  size?: "default" | "sm" | "lg" | "icon";
  /** Additional CSS classes */
  className?: string;
  /** Icon to show in button */
  icon?: React.ReactElement;
}

export interface StandardDialogProps extends BaseDialogProps {
  /** Icon to display */
  icon: React.ReactElement;
  /** Dialog title */
  title: string;
  /** Dialog description */
  description: string;
  /** Button configurations */
  buttons?: DialogButtonProps[];
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Custom content between description and buttons */
  customContent?: React.ReactNode;
}
