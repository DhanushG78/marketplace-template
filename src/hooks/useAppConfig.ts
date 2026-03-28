import { appConfig } from '../config/appConfig';

/**
 * A hook to consume the global app configuration.
 */
export function useAppConfig() {
  const config = appConfig;

  /**
   * Helper to check if a specific feature is enabled.
   */
  const isFeatureEnabled = (featureKey: keyof typeof appConfig.features): boolean => {
    return !!config.features[featureKey];
  };

  /**
   * Helper to get terminology (e.g., 'Item' vs 'Items').
   */
  const getTerminology = (count: number = 1): string => {
    // Basic pluralization helper
    return count === 1 ? config.entity.name : `${config.entity.name}s`;
  };

  return {
    ...config,
    isFeatureEnabled,
    getTerminology,
  };
}
