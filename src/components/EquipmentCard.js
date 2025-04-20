import React from 'react';
import { motion } from 'framer-motion';

const EquipmentCard = ({ item }) => (
  <motion.div
    className="bg-[#161616] rounded-3xl p-6 shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2"
    whileHover={{ scale: 1.03 }}
  >
    <h3 className="text-2xl font-bold text-yellow-400 mb-3">{item.name}</h3>
    <p className="opacity-70">Category: {item.category}</p>
    <p className="opacity-70">Price: ${item.price_per_day} / day</p>
    <p className={`mt-3 ${item.available ? 'text-green-400' : 'text-red-400'}`}>
      {item.available ? 'Available' : 'Unavailable'}
    </p>
  </motion.div>
);

export default EquipmentCard;
