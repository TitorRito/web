import { CloseIcon, ErrorIcon } from "@/lib/svgs";

// --- Component: Error Notification ---
export const ErrorNotification = ({ error, visible, onClose }) => {
    if (!visible || !error) return null;

    return (
        <div className="fixed top-5 right-5 bg-red-900 border border-red-700 text-white px-4 py-3 rounded shadow-lg z-50 flex items-start max-w-md animate-[fadeIn_0.3s_ease-in-out]">
            <div className="mr-2 flex-shrink-0 pt-0.5">
                <ErrorIcon />
            </div>
            <div>
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
            </div>
            <button
                onClick={onClose}
                className="ml-auto flex-shrink-0 -mr-1 text-red-300 hover:text-white transition-colors"
            >
                <CloseIcon />
            </button>
        </div>
    );
};