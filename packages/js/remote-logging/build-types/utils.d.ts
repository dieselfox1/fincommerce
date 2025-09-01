/**
 * Internal dependencies
 */
import { LogData } from './types';
/**
 * Deeply merges two LogData objects.
 *
 * @param target - The target LogData object.
 * @param source - The source LogData object to merge into the target.
 * @return The merged LogData object.
 */
export declare function mergeLogData(target: LogData, source: Partial<LogData>): {
    message: string;
    feature?: string;
    severity?: "emergency" | "alert" | "critical" | "error" | "warning" | "notice" | "info" | "debug";
    host?: string;
    extra?: unknown;
    tags?: string[];
    properties?: Record<string, unknown>;
};
export declare const isDevelopmentEnvironment: boolean;
//# sourceMappingURL=utils.d.ts.map