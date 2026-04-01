import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const names = [
  "Camila", "Jamile", "Fernanda", "Aline", "Beatriz",
  "Mariana", "Juliana", "Patrícia", "Vanessa",
  "Larissa", "Gabriela", "Priscila", "Tatiane",
  "Renata", "Bianca", "Amanda", "Carolina", "Débora",
  "Elaine", "Fabiana", "Helena", "Isabela", "Jéssica",
  "Kelly", "Letícia", "Michele", "Natália", "Raquel",
  "Simone", "Viviane"
];

const messages = [
  (n: string) => `${n} acabou de se cadastrar e se tornou empreendedora`,
  (n: string) => `${n} acabou de se cadastrar`,
  (n: string) => `${n} começou agora`,
  (n: string) => `${n} acabou de entrar para a equipe`,
  (n: string) => `${n} se tornou revendedora agora`,
  (n: string) => `${n} iniciou sua jornada empreendedora`,
];

// Cidades do Pará primeiro, depois outras
const citiesPara = [
  "Belém/PA", "Ananindeua/PA", "Castanhal/PA", "Parauapebas/PA",
  "Paragominas/PA", "Santarém/PA", "Moju/PA", "Almeirim/PA",
];

const citiesOther = [
  "São Paulo/SP", "Rio de Janeiro/RJ", "Manaus/AM",
  "Salvador/BA", "Fortaleza/CE", "Curitiba/PR", "Recife/PE",
  "Belo Horizonte/MG", "Brasília/DF", "Goiânia/GO", "Porto Alegre/RS",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const SocialProofNotifications = () => {
  const [notification, setNotification] = useState<{ name: string; message: string; city: string; id: number } | null>(null);
  const [count, setCount] = useState(0);

  const showNotification = useCallback(() => {
    const name = getRandomItem(names);
    const msg = getRandomItem(messages)(name);
    // Primeiras ~8 notificações priorizam cidades do Pará
    const city = count < 8 ? getRandomItem(citiesPara) : getRandomItem([...citiesPara, ...citiesOther]);
    setNotification({ name, message: msg, city, id: Date.now() });
    setCount(prev => prev + 1);

    const hideDelay = 4000 + Math.random() * 2000;
    setTimeout(() => setNotification(null), hideDelay);
  }, [count]);

  useEffect(() => {
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
    <div className="fixed top-4 right-4 z-50 max-w-[280px] sm:top-6 sm:right-6">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-start gap-2 rounded-lg bg-white p-3 shadow-md border border-gray-100"
          >
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-700 leading-snug">
                {notification.message}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{notification.city} • agora mesmo</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialProofNotifications;
