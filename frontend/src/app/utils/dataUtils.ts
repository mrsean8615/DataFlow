export const USE_DEMO_DATA = true;

export function useDemoData<T>(demoData: T): T | null {
  return USE_DEMO_DATA ? demoData : null;
}
