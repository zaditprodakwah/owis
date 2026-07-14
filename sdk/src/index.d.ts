export interface ValidationResult {
  valid: boolean;
  errors: any[] | null;
}

/**
 * Parses a target workspace and builds a synthesized Workspace Intelligence Report.
 * @param workspacePath Absolute or relative path to the workspace folder.
 * @returns The generated WIR payload.
 */
export function parse(workspacePath: string): object;

/**
 * Validates data against a specific JSON schema of the OWIS specification.
 * @param schemaName The name of the target schema (e.g. 'wir', 'workspace').
 * @param data The payload data to validate.
 * @returns An object indicating validity and validation errors.
 */
export function check(schemaName: string, data: object): ValidationResult;
