/**
 * Enterprise-grade type definitions for create-drop route
 *
 * This file provides comprehensive TypeScript interfaces and types
 * for the create-drop route, ensuring type safety and maintainability
 * across the entire application.
 */

import { type Metadata } from "next";
import { type CreateDropPage } from "@/types";

/**
 * Enhanced layout props with strict typing
 */
export interface CreateDropLayoutProps {
  readonly children: React.ReactNode;
}

/**
 * Enhanced page props interface
 */
export interface CreateDropPageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Error boundary props with comprehensive error types
 */
export interface CreateDropErrorProps {
  readonly error: Error & {
    readonly digest?: string;
    readonly code?: string;
    readonly statusCode?: number;
  };
  readonly reset: () => void;
}

/**
 * Analytics data structure for monitoring
 */
export interface CreateDropAnalytics {
  readonly page: "create-drop";
  readonly source?: string;
  readonly userAgent: string;
  readonly timestamp: number;
  readonly sessionId?: string;
  readonly userId?: string;
}

/**
 * Error logging data structure
 */
export interface ErrorLogData {
  readonly message: string;
  readonly name: string;
  readonly stack?: string;
  readonly digest?: string;
  readonly timestamp: string;
  readonly route: string;
  readonly userAgent: string;
  readonly url: string;
  readonly userId?: string;
  readonly sessionId?: string;
}

/**
 * Loading state types
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * Error severity levels for monitoring
 */
export type ErrorSeverity = "low" | "medium" | "high" | "critical";

/**
 * Error categories for proper handling
 */
export type ErrorCategory =
  | "validation"
  | "network"
  | "timeout"
  | "server"
  | "client"
  | "security"
  | "unknown";

/**
 * Enhanced error interface with categorization
 */
export interface CategorizedError extends Error {
  readonly category: ErrorCategory;
  readonly severity: ErrorSeverity;
  readonly code?: string;
  readonly statusCode?: number;
  readonly digest?: string;
  readonly timestamp: string;
  readonly route: string;
  readonly recoverable: boolean;
}

/**
 * Performance metrics interface
 */
export interface CreateDropPerformanceMetrics {
  readonly pageLoadTime: number;
  readonly dataFetchTime: number;
  readonly renderTime: number;
  readonly interactionTime?: number;
  readonly errorCount: number;
  readonly retryCount: number;
}

/**
 * Security context interface
 */
export interface SecurityContext {
  readonly userAgent: string;
  readonly referer?: string;
  readonly origin?: string;
  readonly ip?: string;
  readonly timestamp: string;
  readonly sessionId?: string;
}

/**
 * Feature flags interface for A/B testing and gradual rollouts
 */
export interface CreateDropFeatureFlags {
  readonly enableAdvancedUpload?: boolean;
  readonly enableAnalytics?: boolean;
  readonly enableErrorReporting?: boolean;
  readonly enablePerformanceMonitoring?: boolean;
  readonly maxFileSize?: number;
  readonly allowedFileTypes?: string[];
}

/**
 * Configuration interface for the create-drop route
 */
export interface CreateDropConfiguration {
  readonly featureFlags: CreateDropFeatureFlags;
  readonly analytics: {
    readonly enabled: boolean;
    readonly trackingId?: string;
  };
  readonly errorReporting: {
    readonly enabled: boolean;
    readonly apiKey?: string;
    readonly environment: "development" | "staging" | "production";
  };
  readonly security: {
    readonly maxRequestSize: number;
    readonly allowedOrigins: string[];
    readonly rateLimiting: {
      readonly enabled: boolean;
      readonly maxRequests: number;
      readonly windowMs: number;
    };
  };
}

/**
 * Validation result interface
 */
export interface ValidationResult<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly errors?: ValidationError[];
}

/**
 * Enhanced validation error with detailed context
 */
export interface ValidationError {
  readonly field: string;
  readonly message: string;
  readonly code: string;
  readonly severity: ErrorSeverity;
}

/**
 * API response wrapper for consistent error handling
 */
export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: {
    readonly message: string;
    readonly code: string;
    readonly details?: unknown;
  };
  readonly metadata?: {
    readonly timestamp: string;
    readonly requestId: string;
    readonly version: string;
  };
}

/**
 * Loading step interface for progress indication
 */
export interface LoadingStep {
  readonly step: number;
  readonly text: string;
  readonly completed: boolean;
  readonly duration?: number;
}

/**
 * Enhanced metadata configuration type
 */
export interface CreateDropMetadata extends Metadata {
  readonly other?: Record<string, string>;
}

/**
 * Type guard functions for runtime type checking
 */

/**
 * Type guard to check if error is a validation error
 */
export function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "field" in error &&
    "message" in error &&
    "code" in error
  );
}

/**
 * Type guard to check if error is categorized
 */
export function isCategorizedError(error: unknown): error is CategorizedError {
  return (
    error instanceof Error &&
    "category" in error &&
    "severity" in error &&
    "recoverable" in error
  );
}

/**
 * Type guard to check if data is valid CreateDropPage
 */
export function isCreateDropPage(data: unknown): data is CreateDropPage {
  return (
    typeof data === "object" &&
    data !== null &&
    "headline" in data &&
    "buttonText" in data &&
    typeof (data as CreateDropPage).headline === "string"
  );
}

/**
 * Utility type for making all properties readonly recursively
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Utility type for extracting error types from union
 */
export type ExtractError<T> = T extends { error: infer E } ? E : never;

/**
 * Utility type for making specific properties required
 */
export type RequiredProperties<T, K extends keyof T> = T & Required<Pick<T, K>>;
