import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Info, AlertCircle } from "lucide-react";

const ICONS = {
  success: CheckCircle,
  info: Info,
  error: AlertCircle,
};

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-wrap">
      <AnimatePresence>
        {toasts.map(t => {
          const Icon = ICONS[t.type] || Info;
          return (
            <motion.div
              key={t.id}
              className={`toast toast-${t.type}`}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <Icon size={14} />
              {t.message}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
