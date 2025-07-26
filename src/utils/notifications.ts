import { toast } from "sonner";

/**
 * Display a success notification
 * @param message The message to display
 */
export function notifySuccess(message: string): void {
  toast.success(message);
}

/**
 * Display an error notification
 * @param message The message to display
 */
export function notifyError(message: string): void {
  toast.error(message);
}

/**
 * Display an info notification
 * @param message The message to display
 */
export function notifyInfo(message: string): void {
  toast(message);
}

/**
 * Display a warning notification
 * @param message The message to display
 */
export function notifyWarning(message: string): void {
  toast.warning(message);
}

/**
 * Display a loading notification
 * @param message The message to display
 * @returns A function to dismiss the notification
 */
export function notifyLoading(message: string): () => void {
  const id = crypto.randomUUID();
  toast.loading(message, { id });

  return () => toast.dismiss(id);
}

/**
 * Display a promise notification that changes based on promise resolution
 * @param promise The promise to track
 * @param messages Object containing loading, success, and error messages
 */
export function notifyPromise<T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  },
): Promise<T> {
  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
  return promise;
}
