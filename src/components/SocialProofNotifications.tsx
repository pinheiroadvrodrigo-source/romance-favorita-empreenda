import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const names = [
  "Camila", "Jamile", "Ronaldo", "Fernanda", "Aline", "Beatriz", "Lucas",
  "Mariana", "Juliana", "Carlos", "Patrícia", "Rafael", "Vanessa", "Thiago",
  "Larissa", "André", "Gabriela", "Diego", "Priscila", "Roberto", "Tatiane",
  "Eduardo", "Renata", "Bianca", "Marcos"
];

const messages = [
  (n: string) => `${n} acabou de se cadastrar e se tornou empreendedora`,
  (n: string) => `${n} acabou de se cadastrar`,
  (n: string) => `${n} começou agora`,
  (n: string) => `${n} acabou de entrar para a equipe`,
  (n: string) => `${n} se tornou revendedora agora`,
  (n: string) => `${n} iniciou sua jornada empreendedora`,
];

const cities = [
  "São Paulo/SP", "Belém/PA", "Rio de Janeiro/RJ", "Manaus/AM",
  "Salvador/BA", "Fortaleza/CE", "Curitiba/PR", "Recife/PE",
  "Belo Horizonte/MG", "Brasília/DF", "Goiânia/GO", "Porto Alegre/RS",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const SocialProofNotifications = () => {
  const [notification, setNotification] = useState<{ name: string; message: string; city: string; id: number } | null>(null);

  const showNotification = useCallback(() => {
    const name = getRandomItem(names);
    const msg = getRandomItem(messages)(name);
    const city = getRandomItem(cities);
    setNotification({ name, message: msg, city, id: Date.now() });

    // Hide after 4-6 seconds
    const hideDelay = 4000 + Math.random() * 2000;
    setTimeout(() => setNotification(null), hideDelay);
  }, []);

  useEffect(() => {
    // First notification after 8 seconds
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 8000);

    const interval = setInterval(() => {
      showNotification();
    }, 5000 + Math.random() * 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [showNotification]);

  return (
    <div className="fixed bottom-20 left-4 z-50 max-w-[320px] sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-lg border border-gray-100"
          >
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 leading-snug">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 mt-1">{notification.city} • agora mesmo</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialProofNotifications;
