import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

const toastList = new Set();
const MAX_TOAST = 1;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const notifyNoInterNet = () => {
  if (!navigator.onLine) {
    if (toastList.size < MAX_TOAST) {
      const id: any = toast.error(
        "Mất kết nối. Vui lòng kiểm tra internet và thử lại.",
        {
          onAutoClose: () => toastList.delete(id),
        }
      );
      toastList.add(id);
    }
    return true;
  }
  return false;
};
