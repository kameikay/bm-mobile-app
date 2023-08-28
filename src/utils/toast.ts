interface ToastProps {
  type: string;
  text: string;
  duration?: number;
}

export default function toast({ type, text, duration }: ToastProps) {
  const event = new CustomEvent("show-toast", {
    detail: {
      type,
      text,
      duration,
    },
  });

  document.dispatchEvent(event);
}
